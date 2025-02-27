<script setup lang="ts">
definePageMeta({
  layout: 'app',
})
const timeout = ref(4000);
const snackbar = ref(false);
let snackbarText;
const updateSheets = useUpdateSheets();
const sheets = useSheets();

onMounted(async () => {
  if(1) {
    try {
      sheets.value = await $fetch('/api/sheets');
    } catch (e) {
      snackbarText = e.data;
      timeout.value = 10000;
      snackbar.value = true;
    }
  } else {
    updateSheets.value = true;
  }

})

</script>

<template>
  <v-sheet max-width="600">
  <h1>Sheets</h1>
  <v-btn block to="/app/sheets/new" class="mb-3 bg-primary">New</v-btn>
  <v-card :text="sheets.length ? null : 'Click New to add Sheets'">
    <v-list>
      <template v-for="(sheet, i) in sheets">
        <v-list-item
            class="mb-2"
            :title="sheet.name"
            :to="'/app/sheets/'+sheet.id"
        >
          <v-list-item-subtitle>
            {{ sheet.uid }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-badge
                :color="(sheet.api_keys.read) ? 'green' : 'red'"
                content="R"
                inline
                rounded="0"
            ></v-badge>
            <v-badge
                :color="(sheet.api_keys.write) ? 'green' : 'red'"
                content="W"
                inline
                rounded="0"
            ></v-badge>
          </template>

        </v-list-item>
        <v-divider v-if="sheets.length > i+1"></v-divider>
      </template>

    </v-list>
  </v-card>
  </v-sheet>


  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
  >
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
