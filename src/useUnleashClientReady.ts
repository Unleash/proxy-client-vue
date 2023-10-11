import { inject, ref, Ref } from 'vue'
import { ContextReadySymbol } from './context'

type TUnleashClientStatus = Ref<Promise<void>>

const useUnleashClientReady = () => {
  const isReady = inject<TUnleashClientStatus>(
    ContextReadySymbol,
    ref(new Promise(() => {}))
  )

  return isReady?.value
}

export default useUnleashClientReady
