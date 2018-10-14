import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private users: User[] = [];
  private me: User = { name: '', id: '', iat: 0, color: '' };
  private inter;
  public cookies = false;
  public name = false;
  public emoji = false;
  public names = '';
  public texte = '';
  public innerWidth: number;

  constructor(private http: HttpService, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      this.router.navigateByUrl('/m');
    }
  }

  keyPress(event: any, input: any) {
    if (event.key === 'Enter' && this.texte !== '') {
      const message = { user: this.me.name, color: this.me.color, text: this.texte, time: Date.now() + 3600000 };
      const Mona = { message: message, user: this.me };
      this.http.post('/chat/chat', Mona).then(res => {
        this.users = res;
      });
      this.texte = '';
      event.preventDefault();
    } else if (event.key === 'Enter' && this.names !== '') {
      this.me.name = this.names;
      this.names = '';
      this.name = true;
      this.me.color = this.randomColor();
      const name = { name: this.me.name, color: this.me.color };
      this.http.post('/chat/new', name).then(res => {
        this.users.push({ name: res.name, id: res.id, iat: res.iat, color: res.color });
        this.me = res;
      });
      this.inter = setInterval(() => {
        this.http
          .get('/chat/users')
          .then(res => {
            this.users = res;
          })
          .catch(err => {
            if (err === 403) {
              clearInterval(this.inter);
              this.name = false;
            }
          });
      }, 750);
    }
  }

  emojiPopup() {
    this.emoji = !this.emoji;
  }

  addEmoji(emoji, event) {
    this.texte += event.emoji.native;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      this.router.navigateByUrl('/m');
    }
    if (document.cookie !== '') {
      this.name = true;
      this.me = this.parseUser();
      this.cookies = this.parseCookie();
      this.inter = setInterval(() => {
        this.http
          .get('/chat/users')
          .then(res => {
            this.users = res;
          })
          .catch(err => {
            if (err === 403) {
              clearInterval(this.inter);
              this.name = false;
            }
          });
      }, 750);
    }
  }

  ngOnDestroy() {
    clearInterval(this.inter);
  }

  parseUser(): User {
    if (this.str_obj(document.cookie).user) {
      return JSON.parse(decodeURIComponent(this.str_obj(document.cookie).user));
    } else {
      return { name: '', id: '', iat: 0, color: '' };
    }
  }

  parseCookie(): boolean {
    if (this.str_obj(document.cookie).cookie) {
      return JSON.parse(decodeURIComponent(this.str_obj(document.cookie).cookie));
    } else {
      return false;
    }
  }

  str_obj(str) {
    str = str.split('; ');
    const result: Cookie = { user: '', cookie: '' };
    for (let i = 0; i < str.length; i++) {
      const cur = str[i].split('=');
      result[cur[0]] = cur[1];
    }
    return result;
  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomColor() {
    let color = '#';
    const possible = '0123456789ABCDEF';

    for (let i = 0; i < 6; i++) {
      color += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return color;
  }

  randomString(min: number, max: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < this.random(min, max); i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
    const expires = 'expires=' + d.toUTCString();
    window.document.cookie = cname + '=' + '; ' + expires;
  }

  cookie(): void {
    window.document.cookie = 'cookie=true;';
    this.cookies = !this.cookies;
  }

  changeName(): void {
    this.deleteCookie('user');
  }
}

interface User {
  name: string;
  id: string;
  iat: number;
  color: string;
}

interface Cookie {
  user: string;
  cookie: string;
}
