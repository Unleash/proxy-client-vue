import { ref, inject, onUnmounted } from 'vue'
import { ContextStateSymbol } from './context'

const useFlag = (name: string) => {
  const { isEnabled, client } = inject(ContextStateSymbol) || {}
  const flag = ref(!!isEnabled.value(name))

  function onUpdate() {
    const enabled = isEnabled.value(name)
    if (enabled !== flag.value) {
      flag.value = !!enabled
    }
  }

  function onReady() {
    flag.value = isEnabled.value(name)
  }

  client.value.on('ready', onReady)
  client.value.on('update', onUpdate)

  onUnmounted(() => {
    client.value.off('ready', onReady)
    client.value.off('update', onUpdate)
  })

  return flag
}

export default useFlag
