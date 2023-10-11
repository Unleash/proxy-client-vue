import { ref, reactive, toRefs } from 'vue'
import { UnleashClient, IConfig, IContext } from 'unleash-proxy-client'

type eventArgs = [Function, any]

export interface IProvideOptions {
  config?: IConfig
  unleashClient?: UnleashClient
  startClient?: boolean
}

function useUnleashProvide({
  config,
  unleashClient,
  startClient = true
}: IProvideOptions) {
  const client = ref<UnleashClient | undefined>(unleashClient)
  const flagsReady = ref(false)
  const flagsError = ref(null)

  if (!config && !unleashClient) {
    console.warn(
      `You must provide either a config or an unleash client to the flag provider. If you are initializing the client in useEffect, you can avoid this warning by
    checking if the client exists before rendering.`
    )
  }

  if (!client.value && config) {
    client.value = new UnleashClient(config)
  }

  client.value?.on('ready', () => {
    flagsReady.value = true
  })

  client.value?.on('error', (e: any) => {
    flagsError.value = e
  })

  const updateContext = async (context: IContext): Promise<void> => {
    await client.value?.updateContext(context)
  }

  const isEnabled = (name: string) => client.value?.isEnabled(name)
  const getVariant = (name: string) => client.value?.getVariant(name)
  const on = (event: string, ...args: eventArgs) =>
    client.value?.on(event, ...args)

  const context = reactive({
    on,
    updateContext,
    isEnabled,
    getVariant,
    client,
    flagsReady,
    flagsError
  })

  const update = (property: string, value: any) => {
    context[property] = value
  }

  const start = () => {
    if (startClient || !unleashClient) {
      return client?.value?.start()
    }
  }

  return {
    context: toRefs(context),
    update,
    start
  }
}

export default useUnleashProvide
