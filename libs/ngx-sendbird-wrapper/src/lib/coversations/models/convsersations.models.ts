export interface SendMessage {
  caption: string;
  id?: number;
}

export interface SendFileMessage {
  file: File;
}
