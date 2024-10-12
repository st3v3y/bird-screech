<script setup lang="ts">
  import MessageList from '@/components/MessageList.vue';
  import { useMessagesStore, type Message } from '@/stores/messages';
  import { storeToRefs } from 'pinia';
  import { computed, ref, watchEffect } from 'vue';

  const store = useMessagesStore();
  const { loading } = storeToRefs(store);
  const { toggleRead } = store;
  const ALL_TEXT = "All";
  
  let filteredMessages = ref();
  let selectedCategory = ref(ALL_TEXT);

  const categories = computed(() => new Set([ALL_TEXT, ...store.unreadMessages.filter((message:Message) => message.category && message.category != "").map((message:Message) => message.category)])); 

  watchEffect(() => {
    filteredMessages.value = (selectedCategory.value == ALL_TEXT ? store.unreadMessages : store.unreadMessages.filter((message:Message) => message.category == selectedCategory.value))
  })
</script>

<template>
  <div class="flex justify-end mb-2">
    <select v-model="selectedCategory">
      <option v-for="(category, index) in categories" v-bind:key="index" :value="category">
        {{ category }}
      </option>
    </select>
  </div>

  <MessageList :messages="filteredMessages" :loading="loading" @messageClick="toggleRead" :showCategory="selectedCategory == ALL_TEXT" />
</template>

