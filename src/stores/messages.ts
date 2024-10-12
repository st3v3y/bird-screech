import { defineStore } from 'pinia'

interface MessageOutbound {
  id: string;
  content: string;
  priority: string;
  category: string;
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
        if (area === 'local' && changes.messages && !this.isInternalUpdate) { 
          const newMessages = changes.messages.newValue;
          const changedMessages = newMessages.filter((message:Message) => !changes.messages.oldValue || !changes.messages.oldValue.some((oldMessage:Message) => oldMessage.id === message.id));
          this.messages = newMessages;
          this.updateBadge();

          const hasPriority = changedMessages && changedMessages.some((msg: Message) => msg.priority == "high");
          const audio = hasPriority ? "screech.m4a" : "calling.m4a";
          const notificationAudio = new Audio(chrome.runtime.getURL("audio/" + audio));
          notificationAudio.play();
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
      chrome.action.setBadgeText({ text: unreadCount > 0 ? unreadCount.toString() : '' });
      chrome.action.setBadgeTextColor({ color: 'white' });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    }
  },
  getters: {
    unreadMessages: (state) => Array.from(state.messages).filter(msg => !msg.read).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    unreadMessageCount: (state) => Array.from(state.messages).filter(msg => !msg.read).length,
    readMessages: (state) => Array.from(state.messages).filter(msg => msg.read).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }
});
