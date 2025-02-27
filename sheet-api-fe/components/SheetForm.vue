<script setup lang="ts">
let sheetOriginal = {};
const origKeys = ref({
  read: null,
  write: null
})

onMounted(() => {
  sheetOriginal = JSON.parse(JSON.stringify(props.sheet));
  origKeys.value.read = JSON.parse(JSON.stringify(props.sheet.api_keys)).read;
})

const props = defineProps({
  sheet: Object,
  title: String
});
const router = useRouter();
const emit = defineEmits(['updated']);
let snackbarTimeout = 4000;
const updateSheets = useUpdateSheets();
const snackbar = ref(false);
const method = ref('');
const valid = ref();
let snackbarText;


async function deleteSheet() {
  try {
    method.value = 'delete'
    await $fetch('/api/sheets/'+props.sheet.id, {
      method: method.value,
      body: {}
    });
    router.push('/app/sheets');
    return;

    updateSheets.value = true;
    snackbarText = 'Deleted'
    snackbar.value = true;
    snackbarTimeout = 1000;
  } catch (e) {
    snackbarText = 'Error'
    snackbar.value = true;
    snackbarTimeout = 5000;
  }
}

const apiEndpoint = computed(() => {
  const base = '/api/sheet/'+props.sheet.uid;
  const key = (origKeys.value.read) ? '?_x-api-key='+origKeys.value.read : ''
  return base+key;
});

async function createSheet() {
  if(!valid.value) return;
  try {
    let sheetId = '';
    method.value = 'post';

    if(props.sheet.id) {
      sheetId = '/'+props.sheet.id;
      method.value = 'patch';
    }
    const response: any = await $fetch('/api/sheets'+sheetId, {
      method: method.value,
      body: props.sheet
    });
    if(method.value==='post') {
      //console.log(props.sheet.name)
      router.push('/app/sheets/'+response.id);
      return;
    }

    emit('updated', response);
    sheetOriginal = JSON.parse(JSON.stringify(props.sheet));
    origKeys.value.read = JSON.parse(JSON.stringify(props.sheet.api_keys)).read;

    updateSheets.value = true;
    snackbarText = 'Saved!'
    snackbar.value = true;
    snackbarTimeout = 2000;
  } catch (e) {
    console.error(e)
    snackbarText = 'Error!'
    snackbar.value = true;
    snackbarTimeout = 5000;
  }
}

function snackbarGone(val: any) {
  if(method.value==='delete') {
    router.push('/app/sheets');
  }
}

function reset() {
  props.sheet.name = sheetOriginal.name;
  props.sheet.sheet_id = sheetOriginal.sheet_id;
  props.sheet.api_keys.read = sheetOriginal.api_keys.read;
  props.sheet.api_keys.write = sheetOriginal.api_keys.write;
  //console.log(sheetOriginal.api_keys.write);
}

function ondel() {
  console.log('ondel')
}

const rules = {
  required: (value: string) => !!value || 'Field is required',
}

</script>

<template>
  <h1> {{ title }}</h1>
  <v-sheet max-width="600" >
    <v-form
        v-model="valid"
        @submit.prevent
        validate-on="input"
    >
      <v-card class="pl-4 py-2 mb-2" v-if="sheet.uid">
        Endpoint: <a target="sheet_api" :href="apiEndpoint">{{ apiEndpoint }}</a>
      </v-card>

      <v-text-field
          v-model="sheet.name"
          label="Sheet name"
          :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
          aria-required="true"
          v-model="sheet.sheet_id"
          :rules="[rules.required]"
          label="Sheet Id"
          placeholder="Find it in Google Sheets URL"
      ></v-text-field>
      <v-text-field
          v-model="sheet.api_keys.read"
          label="API Key to Read"
      ></v-text-field>
      <v-text-field
          v-model="sheet.api_keys.write"
          label="API Key to Write"
      ></v-text-field>
      <v-btn :disabled="!valid" @click="createSheet()" type="submit" block class="mt-2 bg-primary">Submit</v-btn>
      <v-btn @click="reset" block class="mt-2">Reset</v-btn>
      <!--v-btn v-if="sheet.id" @click="deleteSheet()" type="submit" block class="mt-6 bg-red">Delete</v-btn-->
      <ConfirmedDeleteButton
          v-if="sheet.id"
          @timerExpired="deleteSheet()"
          btClass="mt-2 bg-amber block"
          text="Delete"
          :timer="2"
      ></ConfirmedDeleteButton>
    </v-form>
  </v-sheet>

  <v-snackbar
      @update:modelValue="snackbarGone"
      v-model="snackbar"
      :timeout="snackbarTimeout"
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
