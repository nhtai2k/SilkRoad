import { Injectable } from '@angular/core';
import { chatbotUrl } from '@common/global';
import { EUrl } from '@common/url-api';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
      .withUrl(chatbotUrl) 
      .build();

  /**
   * Starts the SignalR connection.
   * 
   * Initializes the SignalR HubConnection using the specified hub URL
   * and attempts to establish a connection. Logs a message to the console
   * upon successful connection or an error if the connection fails.
   */
  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err: any) => console.log('Error while starting SignalR connection: ' + err));
  }

  /**
   * Adds an event listener to the SignalR connection.
   * 
   * Registers a callback function to be executed when the specified event
   * is triggered by the SignalR hub.
   * 
   * @param eventName - The name of the event to listen for.
   * @param callback - The function to execute when the event is triggered.
   */
  public addListener(eventName: string, callback: (...args: any[]) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on(eventName, callback);
    }
  }

  /**
   * Stops the SignalR connection.
   * 
   * Terminates the SignalR connection and logs a message to the console
   * upon successful disconnection or an error if the disconnection fails.
   */
  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('SignalR connection stopped'))
        .catch((err: any) => console.log('Error while stopping SignalR connection: ' + err));
    }
  }
}

