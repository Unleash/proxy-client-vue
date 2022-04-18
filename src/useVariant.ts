import { ref, inject } from 'vue'
import { ContextStateSymbol } from './context'

const useVariant = (name: string) => {
  const { getVariant, client } = inject(ContextStateSymbol) || {}
  const variant = ref(getVariant.value(name))

  client.value.on('update', () => {
    const newVariant = getVariant.value(name)
    if (
      newVariant.name !== variant.value.name ||
      newVariant.enabled !== variant.value.enabled
    ) {
      variant.value = newVariant
    }
  })

  client.value.on('ready', () => {
    variant.value = getVariant.value(name)
  })

  return variant || {}
}

export default useVariant
