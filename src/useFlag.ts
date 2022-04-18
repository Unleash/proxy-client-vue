import { ref, inject } from 'vue'
import { ContextStateSymbol } from './context'

const useFlag = (name: string) => {
  const { isEnabled, client } = inject(ContextStateSymbol) || {}
  const flag = ref(!!isEnabled.value(name))
  const flagRef = ref()
  flagRef.value = flag

  client.value.on('update', () => {
    const enabled = isEnabled.value(name)
    if (enabled !== flagRef.value) {
      flagRef.value = enabled
      flag.value = !!enabled
    }
  })

  client.value.on('ready', () => {
    const enabled = isEnabled.value(name)
    flag.value = enabled
  })

  return flag
}

export default useFlag
