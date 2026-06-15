import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form = { name: '', email: '', subject: '', message: '' };
  submitted = false;
  sending = false;

  onSubmit() {
    this.sending = true;
    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
    }, 1500);
  }
}
