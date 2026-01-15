import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageDto, Message } from '@models/chatbot-models/message.model';
import { ChatbotService } from '@services/chatbot-services/chatbot.service';

@Component({
  selector: 'app-beebot-v1',
  imports: [CommonModule, FormsModule],
  templateUrl: './beebot-v1.component.html',
  styleUrl: './beebot-v1.component.scss'
})
export class BeebotV1Component implements AfterViewChecked, OnInit {
  //#region properties
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  private audio?: HTMLAudioElement; // Add audio property for cleanup

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
    //this.addWelcomeMessage();
  }
  ngOnInit(): void {
    //this.loadVoid(''); // Load initial void or music
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  // private addWelcomeMessage() {
  //   const welcomeMessage: Message = {
  //     id: this.generateId(),
  //     content: 'Hello! I\'m your AI assistant. How can I help you today?',
  //     sender: 'bot',
  //     timestamp: new Date()
  //   };
  //   this.messages.update(messages => [welcomeMessage]);
  // }

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
    //this.addWelcomeMessage();
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
        this.loadVoid(response.response);
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

  private loadVoid(mess: string): void {
    this.chatbotService.getVoid(mess).subscribe({
    //this.chatbotService.getMusic().subscribe({
      next: (data) => {
        // Check if music file is not empty (blob exists and has size > 0)
        if (data && data.size > 0) {
          const audioUrl = URL.createObjectURL(data);
          this.audio = new Audio(audioUrl);
          this.audio.loop = false;
          this.audio.autoplay = true; // Attempt to autoplay
          this.audio.preload = 'auto';
          
          // // Set up audio event handlers
          // this.audio.addEventListener('canplaythrough', () => {
          //   this.audioLoaded = true;
          //   console.log('Audio loaded successfully');
            
          //   // Try to play if user has already interacted
          //   // if (this.userInteracted) {
          //   //   this.playAudio();
          //   // }
          // });
          
          // this.audio.addEventListener('play', () => {
          //   this.isAudioPlaying = true;
          // });
          
          // this.audio.addEventListener('pause', () => {
          //   this.isAudioPlaying = false;
          // });
          
          // this.audio.addEventListener('error', (error) => {
          //   console.error('Audio loading error:', error);
          // });
          
          console.log('Audio setup completed, waiting for user interaction');
        } else {
          console.log('Music file is empty or not available');
        }
      },
      error: (error) => {
        console.error('Error fetching music:', error);
      }
    });
  }

  // private async playAudio(): Promise<void> {
  //   if (!this.audio || !this.userInteracted) {
  //     console.log('Cannot play audio: audio not loaded or user has not interacted');
  //     return;
  //   }

  //   try {
  //     await this.audio.play();
  //     console.log('Audio playing successfully');
  //   } catch (error) {
  //     console.error('Error playing audio:', error);
      
  //     // If autoplay fails, we could show a play button to the user
  //     this.showPlayButton();
  //   }
  // }

  // private showPlayButton(): void {
  //   // You could implement a UI button here for manual audio control
  //   console.log('Consider adding a play button for manual audio control');
  // }
  //   // Public method for template access
  // public enableAudio(): void {
  //   this.handleUserInteraction();
  // }

  // public toggleAudio(): void {
  //   if (!this.audio) return;
    
  //   if (this.isAudioPlaying) {
  //     this.audio.pause();
  //     this.isAudioPlaying = false;
  //   } else {
  //     this.playAudio();
  //   }
  // }
    
  // private setupUserInteractionListener(): void {
  //   // Add event listeners for user interaction
  //   document.addEventListener('click', this.handleUserInteraction, { once: true });
  //   document.addEventListener('keydown', this.handleUserInteraction, { once: true });
  // }

  // private handleUserInteraction = (): void => {
  //   this.userInteracted = true;
    
  //   // Try to play audio if it's loaded
  //   if (this.audioLoaded && this.audio) {
  //     this.playAudio();
  //   }
    
  //   // Initialize audio context if needed
  //   if (!this.audioContext) {
  //     this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  //   }
    
  //   // Resume audio context if suspended
  //   if (this.audioContext.state === 'suspended') {
  //     this.audioContext.resume();
  //   }
  // }

}