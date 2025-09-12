export interface ChatMessageModel {
  id: string; // Guid in C# becomes string in TypeScript
  rservationId: number;
  sender: string;
  content: string;
}
