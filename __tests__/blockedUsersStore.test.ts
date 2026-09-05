import { useBlockedUsersStore } from '../src/store/blockedUsersStore';

describe('blocked users store', () => {
  beforeEach(() => {
    useBlockedUsersStore.setState({ blockedUserIds: [] });
  });

  it('blocks and unblocks a user', () => {
    const store = useBlockedUsersStore.getState();

    store.blockUser(42);
    expect(useBlockedUsersStore.getState().blockedUserIds).toEqual([42]);
    expect(useBlockedUsersStore.getState().isBlocked(42)).toBe(true);

    store.unblockUser(42);
    expect(useBlockedUsersStore.getState().blockedUserIds).toEqual([]);
    expect(useBlockedUsersStore.getState().isBlocked(42)).toBe(false);
  });

  it('does not add the same user twice and toggles state', () => {
    const store = useBlockedUsersStore.getState();

    store.blockUser('user-1');
    store.blockUser('user-1');
    expect(useBlockedUsersStore.getState().blockedUserIds).toEqual(['user-1']);

    store.toggleBlocked('user-1');
    expect(useBlockedUsersStore.getState().blockedUserIds).toEqual([]);
    store.toggleBlocked('user-1');
    expect(useBlockedUsersStore.getState().blockedUserIds).toEqual(['user-1']);
  });
});
