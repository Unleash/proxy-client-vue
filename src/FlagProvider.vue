<script setup lang="ts">
import { onMounted, provide } from 'vue-demi'
import { UnleashClient, IConfig } from 'unleash-proxy-client'

import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import useUnleashProvide from './useUnleashProvide'

const {
  config,
  unleashClient,
  startClient = true
  // duplicated props because of https://github.com/vuejs/core/issues/4294
} = defineProps<{
  config?: IConfig
  unleashClient?: UnleashClient
  startClient?: boolean
}>()

const { context, start, update } = useUnleashProvide({
  config,
  unleashClient,
  startClient
})

provide(ContextStateSymbol, context)
provide(ContextUpdateSymbol, update)

onMounted(() => {
  start()
})
</script>

<template>
  <slot></slot>
</template>
