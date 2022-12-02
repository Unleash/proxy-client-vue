import { IContext } from 'unleash-proxy-client'
import { inject, Ref } from 'vue-demi'
import { ContextStateSymbol } from './context'

type TUnleashContext = Partial<{
  updateContext: Ref<(context: IContext) => Promise<void>>
}>

const useUnleashContext = () => {
  const { updateContext } = inject<TUnleashContext>(ContextStateSymbol, {})

  return updateContext?.value
}

export default useUnleashContext
