# WIP

Work in progress of a PoC for a proxy-client-vue - A Vue SDK for [Unleash](https://www.getunleash.io/) based on the official [proxy-client-react](https://github.com/Unleash/proxy-client-react).

# DISCLAIMER:

This library is meant to be used with the [unleash-proxy](https://github.com/Unleash/unleash-proxy). The proxy application layer will sit between your unleash instance and your client applications, and provides performance and security benefits. DO NOT TRY to connect this library directly to the unleash instance, as the datasets follow different formats because the proxy only returns evaluated toggle information.

# Installation

```bash
npm install @nunogois/proxy-client-vue
// or
yarn add @nunogois/proxy-client-vue
```

# Initialization

Import the provider like this in your entrypoint file (typically App.vue):

```jsx
import FlagProvider from '@nunogois/proxy-client-vue'

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
  environment: 'dev'
}

<template>
  <FlagProvider :config="config">
    <App />
  </FlagProvider>
</template>
```

Alternatively, you can pass your own client in to the FlagProvider:

```jsx
import FlagProvider, { UnleashClient } from '@nunogois/proxy-client-vue'

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
  environment: 'dev'
}

const client = new UnleashClient(config)

<template>
  <FlagProvider :unleashClient="client">
    <App />
  </FlagProvider>
</template>
```

# Usage

## Check feature toggle status

To check if a feature is enabled:

```jsx
<script setup>
import { useFlag } from '@nunogois/proxy-client-vue'

const enabled = useFlag('travel.landing')
</script>

<template>
  <SomeComponent v-if="enabled" />
  <AnotherComponent v-else />
</template>
```

## Check variants

To check variants:

```jsx
<script setup>
import { useVariant } from '@nunogois/proxy-client-vue'

const variant = useVariant('travel.landing')
</script>

<template>
  <SomeComponent v-if="variant.enabled && variant.name === 'SomeComponent'" />
  <AnotherComponent v-else-if="variant.enabled && variant.name === 'AnotherComponent" />
  <DefaultComponent v-else />
</template>
```
