export interface CreateChannel {
  name: string;
}

export interface EditChannel {
  name: string;
  coverUrl: string;
  callback: (channel: SendBird.OpenChannel | SendBird.GroupChannel) => void;
}
