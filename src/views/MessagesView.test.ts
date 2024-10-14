import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessagesStore, type Message } from '@/stores/messages';
import MessagesViewComponent from './MessagesView.vue';

describe('MessageComponent', () => {
  let wrapper: any;
  let store: ReturnType<typeof useMessagesStore>;

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn
    });

    store = useMessagesStore();

    store.$patch({
      messages: [
        { id: '1', content: 'Test 1', category: 'Work', read: false },
        { id: '2', content: 'Test 2', category: 'Personal', read: false },
        { id: '3', content: 'Test 3', category: 'Work', read: false }
      ]
    });
    store.loading = false;

    wrapper = mount(MessagesViewComponent, {
      global: {
        plugins: [pinia],
        stubs: ['MessageList']
      }
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct number of category options', async () => {
    await wrapper.vm.$nextTick();
    const options = wrapper.findAll('option');
    expect(options).toHaveLength(3); // "All", "Work", "Personal"
  });

  it('filters messages when a category is selected', async () => {
    const select = wrapper.find('select');
    await select.setValue('Work');
    await wrapper.vm.$nextTick();

    const messageList = wrapper.findComponent({ name: 'MessageList' });
    const passedMessages = messageList.props('messages');

    expect(passedMessages).toHaveLength(2);
    expect(passedMessages.every((msg: Message) => msg.category === 'Work')).toBe(true);
  });

  it('shows all messages when "All" is selected', async () => {
    const select = wrapper.find('select');
    await select.setValue('All');
    await wrapper.vm.$nextTick();

    const messageList = wrapper.findComponent({ name: 'MessageList' });
    const passedMessages = messageList.props('messages');

    expect(passedMessages).toHaveLength(3);
  });

  it('passes correct props to MessageList component', async () => {
    const messageList = wrapper.findComponent({ name: 'MessageList' });
    expect(messageList.props('messages')).toHaveLength(3); // Initially, all messages
    expect(messageList.props('loading')).toBe(false);
    expect(messageList.props('showCategory')).toBe(true);
  });

  it('calls toggleRead when messageClick event is emitted', async () => {
    const messageList = wrapper.findComponent({ name: 'MessageList' });
    await messageList.vm.$emit('messageClick', '1');
    expect(store.toggleRead).toHaveBeenCalledWith('1');
  });

  it('updates filtered messages when store unreadMessages change', async () => {
    store.unreadMessages.push({
      id: '4',
      content: 'Test 4',
      category: 'Work',
      read: false,
      timestamp: new Date(),
      priority: 'high'
    });
    await wrapper.vm.$nextTick();

    const messageList = wrapper.findComponent({ name: 'MessageList' });
    const passedMessages = messageList.props('messages');

    expect(passedMessages).toHaveLength(4);
  });
});
