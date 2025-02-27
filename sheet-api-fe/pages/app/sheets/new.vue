<script setup lang="ts">
//import SheetForm from "#build/components/SheetForm.vue";

definePageMeta({
  layout: 'app',
})

const newSheet = ref({
  name: undefined,
  sheet_id: undefined,
  api_keys: {
    read: undefined,
    write: undefined
  }
});

</script>

<template>
  <SheetForm title="Create sheet" :sheet="newSheet"></SheetForm>
</template>
