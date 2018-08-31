import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentMessage = '';
  public currentUsername = '';

  constructor(private websocketService: WebsocketService) {}

  public sendMessage() {
    if (this.currentMessage) {
      this.websocketService.sendMessage(this.currentMessage);
      this.currentMessage = '';
    }
  }

  public keydown(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
