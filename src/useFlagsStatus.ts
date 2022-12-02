import { inject, Ref } from 'vue'
import { ContextStateSymbol } from './context'

type TFlagStatusContext = Partial<{
  flagsReady: Ref<boolean>
  flagsError: Ref<boolean>
}>

const useFlagsStatus = () => {
  const { flagsReady, flagsError } = inject<TFlagStatusContext>(
    ContextStateSymbol,
    {}
  )

  return { flagsReady, flagsError }
}

export default useFlagsStatus
