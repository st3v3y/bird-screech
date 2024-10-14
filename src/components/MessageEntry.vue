<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  content: string;
  priority: string;
  timestamp: Date;
  read: boolean;
  category: string;
  showCategory: boolean;
  onReadMessage: () => void;
}>();

const readColor = computed(() => {
  return props.read ? 'gray' : props.priority == 'high' ? 'red' : 'blue';
});
const readableDate = new Date(props.timestamp).toLocaleString('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
});
</script>

<template>
  <div
    v-on="{ click: onReadMessage }"
    :class="`flex px-5 py-3 items-center gap-5 rounded cursor-pointer ${read ? 'bg-gray-50 hover:bg-gray-50/80' : priority == 'high' ? 'bg-red-100 hover:bg-red-100/80' : 'bg-blue-100 hover:bg-blue-100/80'}`"
  >
    <div>
      <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
        <circle r="5" cx="5" cy="5" :fill="readColor" />
      </svg>
    </div>
    <div class="flex flex-col">
      <div class="text-xs text-gray-500">{{ readableDate }}</div>
      <div>
        {{ content }}
      </div>
      <div v-if="showCategory" class="text-xs text-gray-500" :class="!category ? 'italic' : ''">
        {{ category ?? 'No category' }}
      </div>
    </div>
    <span>{{ priority == 'high' ? '🔥' : '&nbsp;' }}</span>
  </div>
</template>
