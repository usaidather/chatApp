import { create } from 'zustand';

interface BlockedUsersState {
  blockedUserIds: Array<number | string>;
  blockUser: (userId: number | string) => void;
  unblockUser: (userId: number | string) => void;
  toggleBlocked: (userId: number | string) => void;
  isBlocked: (userId: number | string) => boolean;
}

export const useBlockedUsersStore = create<BlockedUsersState>((set, get) => ({
  blockedUserIds: [],
  blockUser: userId =>
    set(state =>
      state.blockedUserIds.includes(userId)
        ? state
        : { blockedUserIds: [...state.blockedUserIds, userId] },
    ),
  unblockUser: userId =>
    set(state => ({
      blockedUserIds: state.blockedUserIds.filter(id => id !== userId),
    })),
  toggleBlocked: userId =>
    get().isBlocked(userId)
      ? get().unblockUser(userId)
      : get().blockUser(userId),
  isBlocked: userId => get().blockedUserIds.includes(userId),
}));
