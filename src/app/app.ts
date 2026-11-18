import { AfterViewInit, Component, HostListener, OnDestroy, signal } from '@angular/core';
import { Icon } from './shared/icon';
import { Magnetic } from './shared/directives';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Experience } from './sections/experience/experience';
import { Projects } from './sections/projects/projects';
import { Contact } from './sections/contact/contact';
import { PROFILE } from './data/portfolio.data';

@Component({
  selector: 'app-root',
  imports: [Icon, Magnetic, Hero, About, Skills, Experience, Projects, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
  protected readonly links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  protected loading = signal(true);
  protected scrolled = signal(false);
  protected progress = signal(0);
  protected menuOpen = signal(false);
  protected active = signal('home');
  protected cursor = signal({ x: -200, y: -200, on: false });

  private io?: IntersectionObserver;

  ngAfterViewInit() {
    setTimeout(() => this.loading.set(false), 1400);
    this.io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && this.active.set(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('[data-spy]').forEach((s) => this.io!.observe(s));
  }
  ngOnDestroy() { this.io?.disconnect(); }

  @HostListener('window:scroll')
  onScroll() {
    const h = document.documentElement;
    this.scrolled.set(h.scrollTop > 30);
    this.progress.set((h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100);
  }

  @HostListener('window:pointermove', ['$event'])
  onMove(e: PointerEvent) {
    if (e.pointerType === 'mouse') this.cursor.set({ x: e.clientX, y: e.clientY, on: true });
  }

  toggleMenu() { this.menuOpen.update((v) => !v); }
  closeMenu() { this.menuOpen.set(false); }
  toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
