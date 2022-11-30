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

import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import FlagProvider from './FlagProvider'
import useFlag from './useFlag'
import useFlagsStatus from './useFlagsStatus'
import useVariant from './useVariant'
import useUnleashContext from './useUnleashContext'
import useUnleashClient from './useUnleashClient'
import plugin from './plugin'

export {
  ContextStateSymbol,
  ContextUpdateSymbol,
  FlagProvider,
  useFlag,
  useFlagsStatus,
  useVariant,
  useUnleashContext,
  useUnleashClient,
  plugin
}

export default FlagProvider
