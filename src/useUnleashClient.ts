import { UnleashClient } from 'unleash-proxy-client'
import { inject } from 'vue'
import { ContextStateSymbol } from './context'

const useUnleashClient = () => {
  const { client } = inject(ContextStateSymbol) || {}

  return client as UnleashClient
}

export default useUnleashClient
