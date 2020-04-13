import { Component, OnInit } from '@angular/core';

import { Message } from '../model/message';
import { ChatService } from '../services/chat.service';

@Component({
   templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent  {
    messages: Message[] = [];

   private message: Message = {
    from: "meshal", 
    content: "this is a test message"
  };
  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }



  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.chatService.messages.next(this.message);
    this.message = null;
  }
}