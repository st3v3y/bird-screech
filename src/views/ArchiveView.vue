<script setup lang="ts">
import MessageList from '@/components/MessageList.vue';
import { useMessagesStore } from '@/stores/messages';
import { storeToRefs } from 'pinia';

const store = useMessagesStore();

const { loading, readMessages } = storeToRefs(store);
const { toggleRead } = store;
</script>

<template>
  <MessageList
    :messages="readMessages"
    :loading="loading"
    @messageClick="toggleRead"
    :showCategory="true"
  />
</template>
