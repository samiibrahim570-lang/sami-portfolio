import { Directive, ElementRef, HostListener, OnDestroy, OnInit, inject, input } from '@angular/core';

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Animates an element in when it scrolls into view: reveal="up|left|right|zoom" (default up). */
@Directive({ selector: '[reveal]' })
export class Reveal implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  reveal = input<string>('');
  revealDelay = input(0);
  private io?: IntersectionObserver;

  ngOnInit() {
    const node = this.el.nativeElement as HTMLElement;
    node.classList.add('reveal-ready', `reveal-${this.reveal() || 'up'}`);
    node.style.transitionDelay = `${this.revealDelay()}ms`;
    if (reduceMotion() || !('IntersectionObserver' in window)) { node.classList.add('in'); return; }
    this.io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { node.classList.add('in'); this.io?.disconnect(); }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    this.io.observe(node);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}

/** Counts a number up from 0 when it becomes visible. */
@Directive({ selector: '[countUp]' })
export class CountUp implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  countUp = input.required<number>();
  suffix = input('');
  private io?: IntersectionObserver;

  ngOnInit() {
    const node = this.el.nativeElement as HTMLElement;
    const target = this.countUp();
    node.textContent = `0${this.suffix()}`;
    if (reduceMotion()) { node.textContent = `${target}${this.suffix()}`; return; }
    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.io?.disconnect();
      const start = performance.now(), dur = 1600;
      const step = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        node.textContent = `${Math.round(target * eased)}${this.suffix()}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    this.io.observe(node);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}

/** 3D tilt that follows the pointer, with a moving shine (uses --mx / --my CSS vars). */
@Directive({ selector: '[tilt]', host: { class: 'tilt' } })
export class Tilt {
  private el = inject(ElementRef<HTMLElement>);
  tiltMax = input(8);

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || reduceMotion()) return;
    const node = this.el.nativeElement as HTMLElement;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const m = this.tiltMax();
    node.style.transform = `perspective(900px) rotateX(${(0.5 - y) * m}deg) rotateY(${(x - 0.5) * m}deg) translateY(-6px)`;
    node.style.setProperty('--mx', `${x * 100}%`);
    node.style.setProperty('--my', `${y * 100}%`);
  }

  @HostListener('pointerleave')
  leave() { (this.el.nativeElement as HTMLElement).style.transform = ''; }
}

/** Element drifts toward the pointer slightly (magnetic buttons). */
@Directive({ selector: '[magnetic]' })
export class Magnetic {
  private el = inject(ElementRef<HTMLElement>);

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || reduceMotion()) return;
    const node = this.el.nativeElement as HTMLElement;
    const r = node.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    node.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  }

  @HostListener('pointerleave')
  leave() { (this.el.nativeElement as HTMLElement).style.transform = ''; }
}
