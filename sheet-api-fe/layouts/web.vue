<script setup lang="ts">
import { useDisplay } from 'vuetify'
const router = useRouter();
const display = useDisplay();
const showDrawer = ref(false);
</script>

<template>
    <v-app-bar location="top" :elevation="0">
      <template v-slot:title>
        <v-img
            class=""
            src="/logo.svg"
            max-width="220"
        >
        </v-img>
      </template>

      <v-list class="d-flex">
        <div v-if="display.smAndUp.value" class="d-flex">
          <v-list-item to="/">
            Home
          </v-list-item>
          <v-list-item to="/docs">
            Docs
          </v-list-item>
        </div>
        <v-list-item>
          <v-btn
              color="blue-darken-2"
              :href="'/login'"
              variant="flat"
          >Log in<span v-if="display.mdAndUp.value">&nbsp;with Google</span></v-btn>
        </v-list-item>
      </v-list>
      <v-app-bar-nav-icon
          v-if="!display.smAndUp.value"
          @click.stop="showDrawer = !showDrawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
        v-model="showDrawer"
        :width="213"
        location="end"
        disable-resize-watcher
    >
      <v-list-item to="/" title="Home"></v-list-item>
      <v-list-item to="/docs" title="Docs"></v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-sheet elevation="3" rounded>
          <slot />
        </v-sheet>
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

<style>
ol, ul {
  padding-left: 1em;
}
h2,h3,h4 {
  margin-bottom: 5px;
  margin-top: 15px;
}
p, h1 {
  padding-bottom: 15px;
}
</style>
