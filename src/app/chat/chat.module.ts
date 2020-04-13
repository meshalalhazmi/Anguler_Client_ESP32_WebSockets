import { WebsocketService } from '../services/socket.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatService } from '../services/chat.service';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
   ],
 
  providers: [ChatService,WebsocketService],

})
export class ChatModule { }
