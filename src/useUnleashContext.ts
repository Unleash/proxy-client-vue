import { inject } from 'vue'
import { ContextStateSymbol } from './context'

const useUnleashContext = () => {
  const { updateContext } = inject(ContextStateSymbol) || {}

  return updateContext.value
}

export default useUnleashContext
