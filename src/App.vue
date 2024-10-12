<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useMessagesStore } from './stores/messages';
  import { storeToRefs } from 'pinia';

  const store = useMessagesStore();

  store.loadMessages();
  store.setupStorageListener();

  const { unreadMessageCount } = storeToRefs(store);
</script>

<template>
  <header class="relative">
    <img alt="bird screech logo" class="absolute left-3 top-4" src="@/assets/logo.svg" width="125" height="125" />
    <img alt="bird screech" class="" src="@/assets/screech.svg" width="100%" />
    <h1 class="absolute right-[14px] top-[100px] w-[135px] text-lg font-bold text-white text-center">You have {{ unreadMessageCount > 0 ? unreadMessageCount : "no" }} new message{{ unreadMessageCount > 1 || unreadMessageCount === 0 ? 's' : '' }}!</h1>

    <div class="p-2 mt-[-40px]">
      <nav class="flex gap-2">
        <RouterLink to="/">Messages ({{ unreadMessageCount }})</RouterLink>
        <RouterLink to="/archive">Archive</RouterLink>
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
