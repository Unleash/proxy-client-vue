export type {
  IConfig,
  IContext,
  IMutableContext,
  IVariant,
  IToggle,
  IStorageProvider
} from 'unleash-proxy-client'
export {
  UnleashClient,
  LocalStorageProvider,
  InMemoryStorageProvider
} from 'unleash-proxy-client'

import {
  ContextReadySymbol,
  ContextStateSymbol,
  ContextUpdateSymbol
} from './context'
import FlagProvider from './FlagProvider.vue'
import useFlag from './useFlag'
import useFlagsStatus from './useFlagsStatus'
import useVariant from './useVariant'
import useUnleashContext from './useUnleashContext'
import useUnleashClient from './useUnleashClient'
import useUnleashClientReady from './useUnleashClientReady'
import plugin from './plugin'

export {
  ContextReadySymbol,
  ContextStateSymbol,
  ContextUpdateSymbol,
  FlagProvider,
  useFlag,
  useFlagsStatus,
  useVariant,
  useUnleashContext,
  useUnleashClient,
  useUnleashClientReady,
  plugin
}

export default FlagProvider
