<script setup lang="ts">
  import MessageList from '@/components/MessageList.vue';
  import { useMessagesStore } from '@/stores/messages';
  import { storeToRefs } from 'pinia';

  const store = useMessagesStore();

  const { loading, unreadMessages } = storeToRefs(store);
  const { toggleRead } = store;
</script>

<template>
  <MessageList :messages="unreadMessages" :loading="loading" @messageClick="toggleRead" />
</template>
