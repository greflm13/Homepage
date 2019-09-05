import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe', { static: true })
  private myScrollContainer: ElementRef;
  chat: Message[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    setInterval(() => {
      this.http.get('/chat/chat').then(res => {
        this.chat = res;
        this.scrollToBottom();
      });
    }, 500);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}

interface Message {
  user: string;
  time: Date;
  color: string;
  text: string;
}
