import { defineStore } from 'pinia';

interface OptionsState {
    serverUrl: string;
    playNotificationAudio: boolean;
}

const DEFAULT_SERVER_URL = "http://localhost:3000/api/messages";

export const useOptionsStore = defineStore('options', {
    state: (): OptionsState => ({
        serverUrl: DEFAULT_SERVER_URL,
        playNotificationAudio: true,
    }),
    actions: {
        async loadOptions() {
            return new Promise<OptionsState>((resolve) => {
                chrome.storage.sync.get(['serverUrl', 'playNotificationAudio'], (result: { serverUrl: string; playNotificationAudio: boolean; }) => {

                    console.log("Loaded options", result);
                    
                    this.serverUrl = result.serverUrl || DEFAULT_SERVER_URL;
                    this.playNotificationAudio = result.playNotificationAudio ?? true;
                    resolve(this.$state);
                });
            });
        },
        async syncOptions(options: Partial<OptionsState>) {
            return new Promise<void>((resolve) => {
                chrome.storage.sync.set(options, () => {
                    Object.assign(this, options);
                    resolve();
                });
            });
        },
    },
});