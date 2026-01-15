export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatModel{
    request?: string;
    model?: string;
    response: string;
    context?: any[];
    stream?: boolean;
    error: boolean;
    contextMessages?: ChatMessageDto[];
}
export interface ChatMessageDto{
    role: string;
    content: string;
}