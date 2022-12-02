import { UnleashClient } from 'unleash-proxy-client'
import { inject, Ref } from 'vue'
import { ContextStateSymbol } from './context'

type TUnleashClientContext = Partial<{
  client: Ref<UnleashClient>
}>

const useUnleashClient = () => {
  const { client } = inject<TUnleashClientContext>(ContextStateSymbol, {})

  return client?.value as UnleashClient
}

export default useUnleashClient
