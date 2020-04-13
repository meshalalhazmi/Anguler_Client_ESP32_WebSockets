import { Message } from './../model/message';
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { WebsocketService } from './socket.service';
import { map } from 'rxjs/operators';


 

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = wsService.connect().pipe(map(
      (response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          from: data.user,
          content: data.message
        };
      }
    )) as Subject<Message>;
  }
}
