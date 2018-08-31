import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private MAX_MESSAGES = 5;

  private socket: SocketIOClient.Socket;
  public lastMessages: string[] = [];
  public members: string[] = [];
  private _username = 'New User';

  public get username() {
    return this._username;
  }

  public set username(name: string) {
    this._username = name;
    this.socket.emit('username', name);
  }

  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => console.log('connected'));
    this.socket.on('disconnect', () => console.log('disconnected'));
    this.socket.on('message', data => this.receiveMessage(data));
    this.socket.on('members', members => {
      this.members = members;
      console.log(members);
    });
  }

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public receiveMessage = message => this.addMessage(message);

  private addMessage(message: string) {
    this.lastMessages.push(message);
    if (this.lastMessages.length > this.MAX_MESSAGES) {
      this.lastMessages.splice(0, 1);
    }
  }
}
