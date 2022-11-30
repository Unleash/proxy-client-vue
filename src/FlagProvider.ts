import { onMounted, provide, defineComponent } from 'vue-demi'
import { UnleashClient, IConfig } from 'unleash-proxy-client'

import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import useUnleashProvide from './useUnleashProvide'

export default defineComponent({
  name: 'FlagProvider',
  props: {
    config: {
      type: Object as () => IConfig,
      required: false
    },
    unleashClient: {
      type: Object as () => UnleashClient,
      required: false
    },
    startClient: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, { slots }) {
    const { context, update, start } = useUnleashProvide({
      config: props.config,
      unleashClient: props.unleashClient,
      startClient: props.startClient
    })

    provide(ContextStateSymbol, context)
    provide(ContextUpdateSymbol, update)

    onMounted(() => {
      start()
    })
    return () => slots.default?.()
  }
})
