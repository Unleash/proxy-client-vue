<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import useUnleashProvide, { IProvideOptions } from './useUnleashProvide';

const {
  config,
  unleashClient,
  startClient = true
} = defineProps<IProvideOptions>()

const { context, start, update } = useUnleashProvide({ config, unleashClient, startClient })

provide(ContextStateSymbol, context)
provide(ContextUpdateSymbol, update)


onMounted(() => {
  start()
})
</script>

<template>
  <slot></slot>
</template>
