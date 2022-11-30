import { UnleashClient } from 'unleash-proxy-client'
import { inject } from 'vue-demi'
import { ContextStateSymbol } from './context'
import { ProviderContext } from './useUnleashProvide'

const useUnleashClient = () => {
  const { client } = inject<ProviderContext>(ContextStateSymbol) || {}

  return client.value as UnleashClient
}

export default useUnleashClient
