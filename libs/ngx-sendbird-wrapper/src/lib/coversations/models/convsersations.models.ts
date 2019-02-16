export interface PreviousMessageListQueries {
  [url: string]: SendBird.PreviousMessageListQuery;
}

export interface SendMessage {
  caption: string;
}

export interface SendFileMessage {
  file: File;
}
