import { Message, MessagePart } from "./db/schema";

export function convertToUIMessages(dbMessages: Array<Message>) {
  return dbMessages.map((message) => ({
    id: message.id,
    parts: message.parts as MessagePart[],
    role: message.role as string,
    content: getTextContent(message),
    createdAt: message.createdAt,
  }));
}

export function getTextContent(message: Message): string {
  try {
    const parts = message.parts as MessagePart[];
    return parts
      .filter(part => part.type === 'text' && part.text)
      .map(part => part.text)
      .join('\n');
  } catch (e) {
    return '';
  }
} 