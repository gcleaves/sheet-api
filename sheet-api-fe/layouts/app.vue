<script setup lang="ts">
import {navigateTo} from "nuxt/app";


const config = useRuntimeConfig();
const route = useRoute()
const drawer = ref(false);

const { data, pending, error, refresh } = await useFetch('/login/check');
//console.log('user', data.value);
if(error.value) console.log('error', error.value);
if(! data?.value?.sub) {
  navigateTo('/');
}

</script>

<template>
    <v-app-bar :elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
            class=""
            src="/logo.svg"
            max-width="220"
        >
        </v-img>
      </v-toolbar-title>
      <v-btn href="/logout?redirect=/">
        Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        :width="160"
        v-model="drawer"
        mobile-breakpoint='md'
    >
      <v-list class="mt-1">
        <v-list-item to="/app/sheets">
          Sheets
        </v-list-item>
        <v-list-item to="/app/settings">
          Settings
        </v-list-item>
        <v-list-item to="/app/docs">
          Docs
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 300px;" class="">
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  
    <v-footer>
      <div class="px-4 py-2 text-center w-100">
        <NuxtLink to="privacy">Privacy</NuxtLink>
        | 
        <NuxtLink to="terms">Terms</NuxtLink>
    </div>
    </v-footer>

</template>
