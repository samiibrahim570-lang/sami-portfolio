import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../shared/icon';
import { Magnetic, Reveal } from '../../shared/directives';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, Icon, Reveal, Magnetic],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly p = PROFILE;
  protected readonly items = [
    { icon: 'mail', label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: 'phone', label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replaceAll(' ', '')}` },
    { icon: 'linkedin', label: 'LinkedIn', value: 'in/sami-ibrahim', href: PROFILE.linkedin },
    { icon: 'pin', label: 'Location', value: PROFILE.location, href: '' },
  ];

  protected form = { name: '', email: '', subject: '', message: '' };
  protected sent = signal(false);

  /** No backend: opens the visitor's mail app with the message pre-filled. */
  send() {
    const { name, email, subject, message } = this.form;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${this.p.email}?subject=${encodeURIComponent(subject || `Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    this.sent.set(true);
    setTimeout(() => this.sent.set(false), 4000);
  }
}
