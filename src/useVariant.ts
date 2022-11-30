import { ref, inject, onUnmounted } from 'vue-demi'
import { ContextStateSymbol } from './context'
import { ProviderContext } from './useUnleashProvide'

const useVariant = (name: string) => {
  const { getVariant, client } =
    inject<ProviderContext>(ContextStateSymbol) || {}
  const variant = ref(getVariant.value(name))

  function onUpdate() {
    const newVariant = getVariant.value(name)
    if (
      newVariant.name !== variant.value.name ||
      newVariant.enabled !== variant.value.enabled
    ) {
      variant.value = newVariant
    }
  }

  function onReady() {
    variant.value = getVariant.value(name)
  }

  client.value.on('ready', onReady)
  client.value.on('update', onUpdate)

  onUnmounted(() => {
    client.value.off('ready', onReady)
    client.value.off('update', onUpdate)
  })

  return variant || {}
}

export default useVariant
