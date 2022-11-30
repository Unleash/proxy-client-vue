import { inject } from 'vue-demi'
import { ContextStateSymbol } from './context'
import { ProviderContext } from './useUnleashProvide'

const useUnleashContext = () => {
  const { updateContext } = inject<ProviderContext>(ContextStateSymbol) || {}

  return updateContext.value
}

export default useUnleashContext
