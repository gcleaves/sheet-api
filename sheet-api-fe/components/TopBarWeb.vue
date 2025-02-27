<script setup lang="ts">

</script>

<template>
  <div class="text-right">
    <span class="me-10">
      <NuxtLink to="/">Home</NuxtLink>
    </span>
    <span class="me-10">
      <NuxtLink to="/docs">Documentation</NuxtLink>
    </span>
    <span class="me-10">
      <NuxtLink to="/about">About</NuxtLink>
    </span>
    <span class="me-10">
      <NuxtLink to="/pricing">Pricing</NuxtLink>
    </span>
    <v-btn color="blue-darken-2" :href="'/login'">
      Log in with Google
    </v-btn>
  </div>
</template>
