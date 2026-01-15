import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageDto, Message } from '@models/chatbot-models/message.model';
import { ChatbotService } from '@services/chatbot-services/chatbot.service';

@Component({
  selector: 'app-beebot',
  templateUrl: './beebot.component.html',
  styleUrl: './beebot.component.scss',
  imports: [CommonModule, FormsModule]
})
export class BeebotComponent implements AfterViewChecked {
  //#region properties
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  messages = signal<Message[]>([]);
  currentMessage = signal('');
  chatbotMod = signal(1); // Default server URL
  isConnected = signal(true);
  isLoading = signal(false);
  showSettings = signal(false);
  ChatMessageDto: ChatMessageDto[] = [];

  messagesCount = computed(() => this.messages().length);
  //#endregion
  //#region contructor
  constructor(private chatbotService: ChatbotService) {
    this.addWelcomeMessage();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  private addWelcomeMessage() {
    const welcomeMessage: Message = {
      id: this.generateId(),
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    };
    this.messages.update(messages => [welcomeMessage]);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
//#endregion

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.messages.set([]);
    this.addWelcomeMessage();
  }

  toggleSettings() {
    this.showSettings.update(value => !value);
  }

  focusInput() {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus();
    }
  }
  
  sendMessage() {
    const messageText = this.currentMessage().trim();
    if (!messageText || this.isLoading()) return;

    // Add user message
    const userMessage: Message = {
      id: this.generateId(),
      content: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.update(messages => [...messages, userMessage]);
    this.currentMessage.set('');
    this.isLoading.set(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: 'Typing...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    this.messages.update(messages => [...messages, typingMessage]);

    // Send to chatbot service
    this.chatbotService.sendMessage(messageText, this.ChatMessageDto).subscribe({
      next: (response) => {
        console.log('Chatbot response:', response);
        // Remove typing indicator
        this.messages.update(messages => 
          messages.filter(msg => msg.id !== 'typing')
        );

        // Add bot response
        const botMessage: Message = {
          id: this.generateId(),
          content: response.response,
          sender: 'bot',
          timestamp: new Date()
        };
        this.messages.update(messages => [...messages, botMessage]);
        this.isLoading.set(false);
        // Update context messages
        this.ChatMessageDto = response.contextMessages || [];
      },
      error: (error) => {
        console.error('Error sending message:', error);
        // Remove typing indicator
        this.messages.update(messages => 
          messages.filter(msg => msg.id !== 'typing')
        );

        // Add error message
        const errorMessage: Message = {
          id: this.generateId(),
          content: 'Sorry, I encountered an error. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        };
        this.messages.update(messages => [...messages, errorMessage]);
        this.isLoading.set(false);
      }
    });
  }

}
