import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, inject, signal, viewChild } from '@angular/core';
import { Icon } from '../../shared/icon';
import { CountUp, Magnetic } from '../../shared/directives';
import { PROFILE, STATS } from '../../data/portfolio.data';

interface Dot { x: number; y: number; vx: number; vy: number; r: number; }

@Component({
  selector: 'app-hero',
  imports: [Icon, CountUp, Magnetic],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, AfterViewInit, OnDestroy {
  protected readonly p = PROFILE;
  protected readonly stats = STATS;
  protected readonly firstLetters = [...PROFILE.firstName];
  protected readonly lastLetters = [...PROFILE.lastName];
  protected readonly orbit = [
    { label: 'Angular', color: '#dd0031' },
    { label: '.NET', color: '#512bd4' },
    { label: 'C#', color: '#68217a' },
    { label: 'SQL', color: '#cc2927' },
    { label: 'TS', color: '#3178c6' },
    { label: 'RxJS', color: '#b7178c' },
  ];

  protected typed = signal('');
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('net');
  private zone = inject(NgZone);
  private timers: ReturnType<typeof setTimeout>[] = [];
  private raf = 0;
  private resizeObs?: ResizeObserver;

  ngOnInit() { this.typeLoop(0, 0, false); }

  /** Typewriter: types a role, pauses, deletes, moves to the next. */
  private typeLoop(roleIdx: number, charIdx: number, deleting: boolean) {
    const role = this.p.roles[roleIdx];
    this.typed.set(role.slice(0, charIdx));
    let next: () => void, delay: number;
    if (!deleting && charIdx < role.length) { next = () => this.typeLoop(roleIdx, charIdx + 1, false); delay = 70; }
    else if (!deleting) { next = () => this.typeLoop(roleIdx, charIdx, true); delay = 1800; }
    else if (charIdx > 0) { next = () => this.typeLoop(roleIdx, charIdx - 1, true); delay = 35; }
    else { next = () => this.typeLoop((roleIdx + 1) % this.p.roles.length, 0, false); delay = 300; }
    this.timers.push(setTimeout(next, delay));
    if (this.timers.length > 4) this.timers.shift();
  }

  ngAfterViewInit() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.zone.runOutsideAngular(() => this.startNetwork());
  }

  /** Light particle network drawn behind the hero; dots connect and lean toward the pointer. */
  private startNetwork() {
    const cvs = this.canvas()?.nativeElement;
    const ctx = cvs?.getContext('2d');
    if (!cvs || !ctx) return;
    let w = 0, h = 0, dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const size = () => {
      w = cvs.clientWidth; h = cvs.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.8 + 0.8,
      }));
    };
    this.resizeObs = new ResizeObserver(size);
    this.resizeObs.observe(cvs);
    cvs.parentElement!.addEventListener('pointermove', (e) => {
      const r = cvs.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    cvs.parentElement!.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        const mdx = mouse.x - d.x, mdy = mouse.y - d.y, md = Math.hypot(mdx, mdy);
        if (md < 160) { d.x += mdx * 0.006; d.y += mdy * 0.006; }
      }
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j], dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(30, 69, 148, ${0.16 * (1 - dist / 130)})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(mouse.x - a.x, mouse.y - a.y);
        if (md < 160) {
          ctx.strokeStyle = `rgba(47, 107, 255, ${0.35 * (1 - md / 160)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(22, 53, 111, .45)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      this.raf = requestAnimationFrame(tick);
    };
    tick();
  }

  ngOnDestroy() {
    this.timers.forEach(clearTimeout);
    cancelAnimationFrame(this.raf);
    this.resizeObs?.disconnect();
  }
}
