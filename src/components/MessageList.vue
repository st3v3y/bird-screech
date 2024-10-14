<script setup lang="ts">
import MessageEntry from './MessageEntry.vue';
import type { Message } from '@/stores/messages';

defineProps<{
  messages: Message[];
  loading: boolean;
  showCategory: boolean;
  onMessageClick: (id: string) => void;
}>();
</script>

<template>
  <div v-if="loading">Loading</div>
  <div v-else>
    <div v-if="messages.length == 0" class="p-4 bg-slate-100 rounded-md">
      You have no messages here
    </div>
    <div class="flex flex-col gap-1 max-h-64 overflow-y-scroll">
      <div v-for="{ id, content, priority, timestamp, category, read } in messages" :key="id">
        <MessageEntry
          :content="content"
          :priority="priority"
          :timestamp="timestamp"
          :read="read"
          @readMessage="onMessageClick(id)"
          :category="category"
          :showCategory
        />
      </div>
    </div>
  </div>
</template>
