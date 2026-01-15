import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../../core/models/chatbot-models/message.model';
import { CommonModule } from '@angular/common';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, CardBodyComponent, CardComponent, CardHeaderComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit{
  messages: Message[] = [];
  conversationId: string | null = null;
  isLoading = true;
  
  // Mock data for demonstration - replace with actual service call
  private mockMessages: Message[] = [
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date('2024-01-15T10:00:00')
    },
    {
      id: '2',
      content: 'I need help with understanding Angular components.',
      sender: 'user',
      timestamp: new Date('2024-01-15T10:01:00')
    },
    {
      id: '3',
      content: 'Angular components are the building blocks of Angular applications. They control a patch of screen called a view. Here are the key concepts:\n\n1. **Component Class**: Contains the data and logic\n2. **Template**: Defines the HTML structure\n3. **Metadata**: Provides additional information via decorators\n\nWould you like me to explain any of these in more detail?',
      sender: 'bot',
      timestamp: new Date('2024-01-15T10:02:00')
    },
    {
      id: '4',
      content: 'Yes, can you explain more about component templates?',
      sender: 'user',
      timestamp: new Date('2024-01-15T10:03:00')
    },
    {
      id: '5',
      content: 'Component templates in Angular define the component\'s view. They use HTML enhanced with Angular markup:\n\n• **Interpolation**: {{ }} to display data\n• **Property Binding**: [property]="value"\n• **Event Binding**: (event)="handler()"\n• **Two-way Binding**: [(ngModel)]="property"\n• **Directives**: *ngIf, *ngFor, etc.\n\nTemplates can be inline (template property) or external files (templateUrl).',
      sender: 'bot',
      timestamp: new Date('2024-01-15T10:04:00')
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id');
    this.loadMessages();
  }

  private loadMessages() {
    // Simulate API call delay
    setTimeout(() => {
      this.messages = this.mockMessages;
      this.isLoading = false;
    }, 1000);
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 3600);

    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // Less than a week
      return messageTime.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return messageTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  }

  formatMessageContent(content: string): string {
    // Basic markdown-style formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  goBack(): void {
    this.router.navigate(['/conversations'], { relativeTo: this.route });
  }
}
