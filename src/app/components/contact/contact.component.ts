import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm: FormGroup;
  sending = false;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.sending = true;

    emailjs.send(
      'service_nl18ikr',
      'template_l2ayjm8',
      {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
      },
      '8rtneTbxosiDAPT-3'
    )
    .then(() => {
      this.sending = false;
      this.submitted = true;
      this.contactForm.reset();
    })
    .catch((err) => {
      this.sending = false;
      console.log(err);
      alert('Message send failed');
    });
  }

  sendAnother() {
    this.submitted = false;
  }
}
