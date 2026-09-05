export type ChatsStackParamList = {
  Chats: undefined;
  Chat: {
    userId: number | string;
    userName: string;
    avatar?: string;
  };
  Profile: {
    userId: number | string;
  };
};

export type TabParamList = {
  Chats: undefined;
  Settings: undefined;
};
