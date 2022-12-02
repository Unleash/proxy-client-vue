import { UnleashClient } from 'unleash-proxy-client'
import { ref, inject, onUnmounted, Ref } from 'vue-demi'
import { ContextStateSymbol } from './context'

type TFlagContext = Partial<{
  isEnabled: Ref<(name: string) => boolean | undefined>
  client: Ref<UnleashClient>
}>

const useFlag = (name: string) => {
  const { isEnabled, client } = inject<TFlagContext>(ContextStateSymbol, {})
  const flag = ref(Boolean(isEnabled?.value(name)))

  function onUpdate() {
    const enabled = isEnabled?.value(name)
    if (enabled !== flag.value) {
      flag.value = !!enabled
    }
  }

  function onReady() {
    flag.value = Boolean(isEnabled?.value(name))
  }

  client?.value.on('ready', onReady)
  client?.value.on('update', onUpdate)

  onUnmounted(() => {
    client?.value.off('ready', onReady)
    client?.value.off('update', onUpdate)
  })

  return flag
}

export default useFlag
