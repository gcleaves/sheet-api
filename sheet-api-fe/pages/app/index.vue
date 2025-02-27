<script setup lang="ts">
import {onMounted} from "vue";

definePageMeta({
  layout: 'app'
})
const router = useRouter();
onMounted(()=>router.replace('/app/sheets'));


</script>

<template>
  <h1>Index</h1>
  <p>Send me to sheets</p>
</template>
