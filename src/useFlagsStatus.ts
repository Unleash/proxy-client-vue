import { inject } from 'vue'
import { ContextStateSymbol } from './context'

const useFlagsStatus = () => {
  const { flagsReady, flagsError } = inject(ContextStateSymbol)

  return { flagsReady, flagsError }
}

export default useFlagsStatus
