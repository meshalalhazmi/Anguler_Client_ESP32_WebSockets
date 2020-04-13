import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, Observable, Observer } from 'rxjs';

const SERVER_URL = 'ws://192.168.1.1:8080';
const myWebSocket: WebSocketSubject<any> = webSocket('ws://192.168.1.1:8080');
 
@Injectable()
export class WebsocketService {
  constructor() { }

  private subject: Subject<MessageEvent>;

  public connect2() {
    myWebSocket.subscribe(
      msg => console.log('message received: ' + msg),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );
  }

  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create();
      console.log("Successfully connected: " + SERVER_URL);
    }
    return this.subject;
  }

  private create(): Subject<MessageEvent> {
    const ws = new WebSocket(SERVER_URL);

    const observable = Observable.create((observer: Observer<MessageEvent>) => {
      ws.onmessage = observer.next.bind(observer);
      ws.onerror = observer.error.bind(observer);
      ws.onclose = observer.complete.bind(observer);
      return ws.close.bind(ws);
    });
    const observer = {
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}