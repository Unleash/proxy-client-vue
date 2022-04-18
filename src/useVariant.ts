import { ref, inject } from 'vue'
import { ContextStateSymbol } from './context'

const useVariant = (name: string) => {
  const { getVariant, client } = inject(ContextStateSymbol) || {}
  const variant = ref(getVariant.value(name))
  const variantRef = ref()
  variantRef.value = variant

  client.value.on('update', () => {
    const newVariant = getVariant.value(name)
    if (
      newVariant.name !== variantRef.value.name ||
      newVariant.enabled !== variantRef.value.enabled
    ) {
      variantRef.value = newVariant
      variant.value = newVariant
    }
  })

  client.value.on('ready', () => {
    const newVariant = getVariant.value(name)
    variant.value = newVariant
  })

  return variant || {}
}

export default useVariant
