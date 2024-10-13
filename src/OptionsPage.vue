<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useOptionsStore } from './stores/options';
  import { useMessagesStore } from './stores/messages';

  const optionsStore = useOptionsStore();
  const messageStore = useMessagesStore();

  const serverUrl = ref('');
  const playNotificationAudio = ref(false);
  const { messageCount } = messageStore;

  onMounted(async () => {
    await loadOptions();
  });

  async function loadOptions() {
    const options = await optionsStore.loadOptions();
    
    serverUrl.value = options.serverUrl || '';
    playNotificationAudio.value = options.playNotificationAudio || false;
  }

  async function saveOptions() {
    await optionsStore.syncOptions({
      serverUrl: serverUrl.value,
      playNotificationAudio: playNotificationAudio.value
    });
  }

  function clearMessages() {
    chrome.storage.local.set({ messages: [] });
  }
</script>

<template>

  <h1 class="lg:text-3xl text-xl font-bold">Bird Screech Options</h1>
  
  <div class="form-cols">
    <div>
      <label for="serverUrl" class="form-label">Message Server Url:</label>
      <input v-model="serverUrl" type="text" @change="saveOptions" class="form-input">
    </div>
    <div>
      <label>
        <input v-model="playNotificationAudio" type="checkbox" @change="saveOptions">
        Play notification sounds
      </label>
    </div>
    <div>
      <button @click="clearMessages" class="clear-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        Clear all messages ({{messageCount}})
      </button>
    </div>
  </div>

</template>

<style scoped>

  *, *::before, *::after{
    box-sizing: border-box; 
  }

  input, button, textarea, select{
    font: inherit; 
  }

  body, html{
    height: 100%; 
    scroll-behavior: smooth; 
  }

  .form-cols {
    @apply mt-4 flex flex-col gap-3 w-full;
  }

  .form-label {
    @apply block;
  } 

  .form-input {
    @apply border border-gray-300 rounded p-2 w-full;
  }

  .clear-button {
    @apply bg-red-500 rounded p-2 w-full text-white flex gap-2 justify-center items-center border-0 cursor-pointer hover:bg-red-400;
  }
</style>

