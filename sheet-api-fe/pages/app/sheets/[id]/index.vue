<script setup lang="ts">

definePageMeta({
  layout: 'app',
})
const route = useRoute();
const updateSheets = useUpdateSheets();
const { data, pending, error, refresh } = await useFetch('/api/sheets/'+route.params.id);
let sheet: any = data.value;
updateSheets.value = false;

function uppy(s: any) {
  sheet = s;
}
</script>

<template>
  <SheetForm @updated="(s)=>uppy(s)" title="Sheet settings" :sheet="sheet"></SheetForm>
</template>
