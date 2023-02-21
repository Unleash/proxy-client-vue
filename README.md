# proxy-client-vue

PoC for a Vue SDK for [Unleash](https://www.getunleash.io/) based on the official [proxy-client-react](https://github.com/Unleash/proxy-client-react).

# DISCLAIMER:

This library is meant to be used with the [unleash-proxy](https://github.com/Unleash/unleash-proxy). The proxy application layer will sit between your unleash instance and your client applications, and provides performance and security benefits. DO NOT TRY to connect this library directly to the unleash instance, as the datasets follow different formats because the proxy only returns evaluated toggle information.

# Installation

```bash
npm install @unleash/proxy-client-vue
// or
yarn add @unleash/proxy-client-vue
```

# Initialization

## Using config:

```jsx
import { createApp } from 'vue'
import { plugin as unleashPlugin } from '@unleash/proxy-client-vue'
// import the root component App from a single-file component.
import App from './App.vue'

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
}

const app = createApp(App)
app.use(unleashPlugin, { config })
app.mount('#app')
```

Or use the FlagProvider component like this in your entrypoint file (typically App.vue):

```jsx
import { FlagProvider } from '@unleash/proxy-client-vue'

const config = {
  url: 'https://UNLEASH-INSTANCE/api/frontend',
  clientKey: 'CLIENT—SIDE—API—TOKEN',
  refreshInterval: 15,
  appName: 'your-app-name',
}

<template>
  <FlagProvider :config="config">
    <App />
  </FlagProvider>
</template>
```

## Initializing your own client

```jsx
import { createApp } from 'vue'
import { plugin as unleashPlugin } from '@unleash/proxy-client-vue'
// import the root component App from a single-file component.
import App from './App.vue'

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
}

const client = new UnleashClient(config)

const app = createApp(App)
app.use(unleashPlugin, { unleashClient: client })
app.mount('#app')
```

Or, using FlagProvider:

```jsx
import { FlagProvider, UnleashClient } from '@unleash/proxy-client-vue'

const config = {
  url: 'https://UNLEASH-INSTANCE/api/frontend',
  clientKey: 'CLIENT—SIDE—API—TOKEN',
  refreshInterval: 15,
  appName: 'your-app-name',
}

const client = new UnleashClient(config)

<template>
  <FlagProvider :unleash-client="client">
    <App />
  </FlagProvider>
</template>
```

## Deferring client start

By default, the Unleash client will start polling the Proxy for toggles immediately when the `FlagProvider` component renders. You can delay the polling by:

- setting the `startClient` prop to `false`
- passing a client instance to the `FlagProvider`

```jsx
<template>
  <FlagProvider :unleash-client="client" :start-client="false">
    <App />
  </FlagProvider>
</template>
```

Deferring the client start gives you more fine-grained control over when to start fetching the feature toggle configuration. This could be handy in cases where you need to get some other context data from the server before fetching toggles, for instance.

To start the client, use the client's `start` method. The below snippet of pseudocode will defer polling until the end of the `asyncProcess` function.

```jsx
const client = new UnleashClient({
  /* ... */
})

onMounted(() => {
  const asyncProcess = async () => {
    // do async work ...
    client.start()
  }
  asyncProcess()
})

<template>
  <FlagProvider :unleash-client="client" :start-client="false">
    <App />
  </FlagProvider>
</template>
```

# Usage

## Check feature toggle status

To check if a feature is enabled:

```jsx
<script setup>
import { useFlag } from '@unleash/proxy-client-vue'

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
import { useVariant } from '@unleash/proxy-client-vue'

const variant = useVariant('travel.landing')
</script>

<template>
  <SomeComponent v-if="variant.enabled && variant.name === 'SomeComponent'" />
  <AnotherComponent v-else-if="variant.enabled && variant.name === 'AnotherComponent" />
  <DefaultComponent v-else />
</template>
```

## Defer rendering until flags fetched

useFlagsStatus retrieves the ready state and error events.
Follow the following steps in order to delay rendering until the flags have been fetched.

```jsx
import { useFlagsStatus } from '@unleash/proxy-client-vue'

const { flagsReady, flagsError } = useFlagsStatus()

<Loading v-if="!flagsReady" />
<MyComponent v-else error={flagsError} />
```

## Updating context

Follow the following steps in order to update the unleash context:

```jsx
import { useUnleashContext, useFlag } from '@unleash/proxy-client-vue'

const props = defineProps<{
  userId: string
}>()

const { userId } = toRefs(props)

const updateContext = useUnleashContext()

onMounted(() => {
  updateContext({ userId })
})

watch(userId, () => {
  async function run() {
    await updateContext({ userId: userId.value })
    console.log('new flags loaded for', userId.value)
  }
  run()
})
```
