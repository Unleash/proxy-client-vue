import { ref, inject } from 'vue'
import { ContextStateSymbol } from './context'

const useFlag = (name: string) => {
  const { isEnabled, client } = inject(ContextStateSymbol) || {}
  const flag = ref(!!isEnabled.value(name))

  client.value.on('update', () => {
    const enabled = isEnabled.value(name)
    if (enabled !== flag.value) {
      flag.value = !!enabled
    }
  })

  client.value.on('ready', () => {
    flag.value = isEnabled.value(name)
  })

  return flag
}

export default useFlag
