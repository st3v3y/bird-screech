import { setActivePinia, createPinia } from 'pinia';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useMessagesStore } from './messages';

// Mock Chrome API
const mockChrome = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
    onChanged: {
      addListener: vi.fn(),
    },
  },
  action: {
    setBadgeText: vi.fn(),
    setBadgeTextColor: vi.fn(),
    setBadgeBackgroundColor: vi.fn(),
  },
  runtime: {
    getURL: vi.fn(),
  },
};

global.chrome = mockChrome as any;

describe('Messages Store', () => {
  let store: ReturnType<typeof useMessagesStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useMessagesStore();
    vi.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    expect(store.messages).toEqual([]);
    expect(store.loading).toBe(true);
    expect(store.error).toBe(null);
    expect(store.isInternalUpdate).toBe(false);
  });

  it('should load messages correctly', async () => {
    const mockMessages = [
      { id: '1', content: 'Test message 1', read: false, timestamp: new Date().toISOString() },
      { id: '2', content: 'Test message 2', read: true, timestamp: new Date().toISOString() },
    ];

    mockChrome.storage.local.get.mockImplementation((_, callback) => {
      callback({ messages: mockMessages });
    });

    await store.loadMessages();

    expect(store.messages).toEqual(mockMessages);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
    expect(mockChrome.action.setBadgeText).toHaveBeenCalled();
  });

  it('should handle error when loading messages', async () => {
    const errorMessage = 'Failed to load messages';
    mockChrome.storage.local.get.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await store.loadMessages();

    expect(store.loading).toBe(false);
    expect(store.error).toBe(errorMessage);
  });

  it('should update badge correctly', () => {
    store.messages = [
      { id: '1', content: 'Test message 1', read: false, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '2', content: 'Test message 2', read: true, timestamp: new Date(), category: 'Test category', priority: 'high' },
    ];

    store.updateBadge();

    expect(mockChrome.action.setBadgeText).toHaveBeenCalledWith({ text: '1' });
    expect(mockChrome.action.setBadgeTextColor).toHaveBeenCalledWith({ color: 'white' });
    expect(mockChrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#FF0000' });
  });

  it('should filter unread messages correctly', () => {
    store.messages = [
      { id: '1', content: 'Test message 1', read: false, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '2', content: 'Test message 2', read: true, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '3', content: 'Test message 3', read: false, timestamp: new Date(), category: 'Test category', priority: 'high' },
    ];

    expect(store.unreadMessages).toHaveLength(2);
    expect(store.unreadMessages[0].id).toBe('1');
    expect(store.unreadMessages[1].id).toBe('3');
  });

  it('should filter read messages correctly', () => {
    store.messages = [
      { id: '1', content: 'Test message 1', read: false, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '2', content: 'Test message 2', read: true, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '3', content: 'Test message 3', read: true, timestamp: new Date(), category: 'Test category', priority: 'high' }
    ];

    expect(store.readMessages).toHaveLength(2);
    expect(store.readMessages[0].id).toBe('2');
    expect(store.readMessages[1].id).toBe('3');
  });

  it('should count unread messages correctly', () => {
    store.messages = [
      { id: '1', content: 'Test message 1', read: false, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '2', content: 'Test message 2', read: true, timestamp: new Date(), category: 'Test category', priority: 'high' },
      { id: '3', content: 'Test message 3', read: false, timestamp: new Date(), category: 'Test category', priority: 'high' }
    ];

    expect(store.unreadMessageCount).toBe(2);
  });
});