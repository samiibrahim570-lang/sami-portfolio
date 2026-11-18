import { AfterViewInit, Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';
import { Icon } from '../../shared/icon';
import { Reveal, Tilt } from '../../shared/directives';
import { EDUCATION, EXPERIENCE } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  imports: [Icon, Reveal, Tilt],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements AfterViewInit {
  protected readonly jobs = EXPERIENCE;
  protected readonly education = EDUCATION;
  protected lineFill = signal(0);
  private timeline = viewChild<ElementRef<HTMLElement>>('timeline');

  ngAfterViewInit() { this.update(); }

  /** Timeline line "draws" itself as you scroll through the section. */
  @HostListener('window:scroll')
  update() {
    const el = this.timeline()?.nativeElement;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const start = window.innerHeight * 0.7;
    const pct = ((start - r.top) / r.height) * 100;
    this.lineFill.set(Math.max(0, Math.min(100, pct)));
  }
}
