'use client';

import { ChatMessage as ChatMessageType } from '@/lib/mockData';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.senderId === 'user';

  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-lg ${
          isUserMessage
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-muted-foreground rounded-bl-none'
        }`}
      >
        {!isUserMessage && <p className="text-xs font-semibold mb-1 opacity-70">{message.senderName}</p>}
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${isUserMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
