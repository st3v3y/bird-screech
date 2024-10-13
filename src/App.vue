<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useMessagesStore } from './stores/messages';
  import { storeToRefs } from 'pinia';
  import { useOptionsStore } from './stores/options';
  import ScreechScreen from './components/ScreechScreen.vue';

  const messageStore = useMessagesStore();
  const optionsStore = useOptionsStore();
  
  optionsStore.loadOptions();
  messageStore.loadMessages();
  messageStore.setupStorageListener();

  const { unreadMessageCount } = storeToRefs(messageStore);
</script>

<template>
  <header class="relative">
    <img alt="bird screech logo" class="absolute left-3 top-4" src="@/assets/logo.svg" width="125" height="125" />
    <ScreechScreen />
    <h1 class="absolute right-[14px] top-[100px] w-[135px] text-lg font-bold text-white text-center">You have {{ unreadMessageCount > 0 ? unreadMessageCount : "no" }} new message{{ unreadMessageCount > 1 || unreadMessageCount === 0 ? 's' : '' }}!</h1>

    <div class="p-2 mt-[-40px]">
      <nav>
        <div class="flex gap-2">
          <RouterLink to="/">Messages ({{ unreadMessageCount }})</RouterLink>
          <RouterLink to="/archive">Archive</RouterLink>
        </div>
        <div class="absolute right-2 top-2">
          <RouterLink to="/options">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <main class="p-2 min-w-[300px] w-[300px]">
    <RouterView />
  </main>
</template>

<style scoped>
  .router-link-active {
    @apply font-bold text-blue-800;
  }
</style>
