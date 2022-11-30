import { inject } from 'vue-demi'
import { ContextStateSymbol } from './context'
import { ProviderContext } from './useUnleashProvide'

const useFlagsStatus = () => {
  const { flagsReady, flagsError } =
    inject<ProviderContext>(ContextStateSymbol) || {}

  return { flagsReady, flagsError }
}

export default useFlagsStatus
