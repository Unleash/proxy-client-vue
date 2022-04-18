<script setup lang="ts">
import { ref, onMounted, reactive, provide, toRefs } from 'vue'
import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import { UnleashClient, IConfig, IContext } from 'unleash-proxy-client'

type eventArgs = [Function, any]

const { config, unleashClient, startClient } = defineProps<{
  config?: IConfig
  unleashClient?: UnleashClient
  startClient?: boolean
}>()

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

onMounted(() => {
  const shouldStartClient = startClient || !unleashClient
  if (shouldStartClient) client.value?.start()
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
}) as { [key: string]: any }

provide(ContextStateSymbol, toRefs(context))

const update = (property: string, value: any) => {
  context[property] = value
}

provide(ContextUpdateSymbol, update)
</script>

<template>
  <slot></slot>
</template>
