<script setup lang="ts">
import {onMounted} from "vue";

const props = defineProps({
  text: {
    type: String,
    default: 'Delete'
  },
  timer: {
    type: Number,
    default: 4
  },
  btClass: {}
});

const emit = defineEmits(['timer-expired'])

const cancelText = ref('');
const cancelTime = ref();

let st, int;

function startTimer() {
  if(cancelTime.value && (cancelTime.value < props.timer)) {
    //console.log('timer cancelled');
    clearInterval(int);
    cancelText.value = '';
    cancelTime.value = 0;
    return;
  }
  cancelTime.value = props.timer;
  //console.log('timer start');
  cancelText.value = `Cancel within ${cancelTime.value}s`
  int = setInterval(() => {
    cancelTime.value--
    if(!cancelTime.value) {
      cancelText.value = '';
      clearInterval(int);
      cancelTime.value = props.timer;
      console.log('timer expired!')
      emit('timer-expired')
      cancelTime.value = 0;
      return;
    }
    cancelText.value = `Cancel within ${cancelTime.value}s`
  }, 1000);
}
</script>

<template>
  <v-btn block :class="btClass" @click="startTimer">
    {{ text }} {{ cancelText }}
  </v-btn>
  <v-progress-linear :model-value="100/props.timer * cancelTime"></v-progress-linear>
</template>
