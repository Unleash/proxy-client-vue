import { inject } from 'vue-demi'
import { ContextStateSymbol } from './context'

const useUnleashContext = () => {
  const { updateContext } = inject(ContextStateSymbol) || {}

  return updateContext.value
}

export default useUnleashContext
