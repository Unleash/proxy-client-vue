import {
  onMounted,
  provide,
  defineComponent,
  h as _h,
  getCurrentInstance
} from 'vue-demi'
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
    console.log('setup')
    const { context, update, start } = useUnleashProvide({
      config: props.config,
      unleashClient: props.unleashClient,
      startClient: props.startClient
    })

    const vm = getCurrentInstance()
    const h = _h.bind(vm)

    provide(ContextStateSymbol, context)
    provide(ContextUpdateSymbol, update)

    // Not working on Vue2
    onMounted(() => {
      console.log('start')
      start()
    })

    // Not rendered in Vue2
    return () => h('span', 'Hello World')
    // return () => slots.default?.()
  }
})
