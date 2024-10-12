import { defineStore } from 'pinia'

interface MessageOutbound {
  id: string;
  content: string;
  priority: string;
  timestamp: Date;
  read: boolean;
}

export interface Message extends MessageOutbound {}

interface MessageStore {
  messages: Message[];
  loading: boolean;
  error: string | null;
  isInternalUpdate: boolean;
}

export const useMessagesStore = defineStore('messages', {
  state: (): MessageStore => ({
    messages: [],
    loading: true,
    error: null,
    isInternalUpdate: false
  }),
  actions: {
    async loadMessages() {
      this.loading = true;
      this.error = null;
      try {
        const result = await new Promise((resolve) => { 
            console.log("Loading messages");
            return chrome.storage.local.get(['messages'], resolve) 
          }
        );
        console.log("Loaded messages", result);
        this.messages = result.messages ? Object.values(result.messages) as Message[] : [];

        this.updateBadge();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    setupStorageListener() {
      chrome.storage.onChanged.addListener((changes:any, area:string) => {
        console.log("Chrome storage changed:", changes, area);
        
        if (area === 'local' && changes.messages && !this.isInternalUpdate) { 
          this.messages = changes.messages.newValue;
          this.updateBadge();
        }
      });
    },
    async toggleRead(messageId: string) {
      const message = this.messages.find(msg => msg.id === messageId);
      if (message) {
        message.read = !message.read;
        this.isInternalUpdate = true;
        await this.syncToStorage();
        this.isInternalUpdate = false;
      }
    },
    async syncToStorage() {
      await new Promise(resolve => 
        chrome.storage.local.set({ messages: this.messages }, resolve)
      );
      this.updateBadge();
    },
    updateBadge() {
      const unreadCount = this.unreadMessages.length;
      chrome.action.setBadgeText({ 
        text: unreadCount > 0 ? unreadCount.toString() : '' 
      });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    }
  },
  getters: {
    unreadMessages: (state) => Array.from(state.messages).filter(msg => !msg.read),
    unreadMessageCount: (state) => Array.from(state.messages).filter(msg => !msg.read).length,
    readMessages: (state) => Array.from(state.messages).filter(msg => msg.read),
  },
});
