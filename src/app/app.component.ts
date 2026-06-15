import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private cursorOuter?: HTMLElement;
  private cursorInner?: HTMLElement;
  private animationFrame = 0;
  private targetX = 0;
  private targetY = 0;
  private scrollRaf = 0;
  private parallaxElements: HTMLElement[] = [];
  // Background particles
  private bgCanvas?: HTMLCanvasElement;
  private bgCtx?: CanvasRenderingContext2D | null;
  private particles: any[] = [];
  private particleAnimId = 0;
  private particleCount = 80; // slightly increased
  private lastTime = 0;

  ngOnInit() {
    this.initScrollReveal();
    this.initCursor();
    this.initParallax();
    this.initBackgroundParticles();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
    cancelAnimationFrame(this.scrollRaf);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseover', this.handleMouseOver);
    document.removeEventListener('mouseout', this.handleMouseOut);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.resizeCanvas);
    cancelAnimationFrame(this.particleAnimId);
  }

  initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);
  }

  initCursor() {
    this.cursorOuter = document.querySelector('.custom-cursor.outer') as HTMLElement;
    this.cursorInner = document.querySelector('.custom-cursor.inner') as HTMLElement;

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseover', this.handleMouseOver);
    document.addEventListener('mouseout', this.handleMouseOut);
  }

  initParallax() {
    this.parallaxElements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (this.parallaxElements.length) {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.targetX = event.clientX;
    this.targetY = event.clientY;

    if (this.cursorInner) {
      this.cursorInner.style.left = `${this.targetX}px`;
      this.cursorInner.style.top = `${this.targetY}px`;
    }

    if (!this.animationFrame) {
      this.animateCursor();
    }
  };

  private handleMouseOver = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest(
      'a, button, .btn-primary, .btn-outline, .social-link, .project-card, .exp-card, .skill-group, .info-card, .contact-item'
    );
    this.toggleCursorHover(!!target);
  };

  private handleMouseOut = (event: MouseEvent) => {
    const related = event.relatedTarget as HTMLElement | null;
    if (!related || !related.closest('a, button, .btn-primary, .btn-outline, .social-link, .project-card, .exp-card, .skill-group, .info-card, .contact-item')) {
      this.toggleCursorHover(false);
    }
  };

  private toggleCursorHover(active: boolean) {
    if (!this.cursorOuter || !this.cursorInner) {
      return;
    }
    this.cursorOuter.classList.toggle('cursor-hover', active);
    this.cursorInner.classList.toggle('cursor-hover', active);
  }

  private animateCursor = () => {
    if (!this.cursorOuter) {
      return;
    }

    const currentX = parseFloat(this.cursorOuter.style.left || '0');
    const currentY = parseFloat(this.cursorOuter.style.top || '0');
    const nextX = currentX + (this.targetX - currentX) * 0.16;
    const nextY = currentY + (this.targetY - currentY) * 0.16;

    this.cursorOuter.style.left = `${nextX}px`;
    this.cursorOuter.style.top = `${nextY}px`;
    this.animationFrame = requestAnimationFrame(this.animateCursor);
  };

  private handleScroll = () => {
    if (this.scrollRaf) {
      return;
    }
    this.scrollRaf = requestAnimationFrame(() => {
      const offset = window.scrollY;
      this.parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset['parallax'] || '0.04');
        el.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
      });
      this.scrollRaf = 0;
    });
  };

  /* Background particle system */
  initBackgroundParticles() {
    this.bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!this.bgCanvas) return;
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas, { passive: true });
    this.createParticles();
    this.lastTime = performance.now();
    this.animateParticles(this.lastTime);
  }

  private resizeCanvas = () => {
    if (!this.bgCanvas || !this.bgCtx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.bgCanvas.style.width = width + 'px';
    this.bgCanvas.style.height = height + 'px';
    this.bgCanvas.width = Math.floor(width * dpr);
    this.bgCanvas.height = Math.floor(height * dpr);
    this.bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  private createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = Math.random() * 3 + 1.2;
    const speed = (Math.random() * 0.2 + 0.02);
    const angle = Math.random() * Math.PI * 2;
    const colors = [getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim() || '#00D4FF', getComputedStyle(document.documentElement).getPropertyValue('--purple').trim() || '#7C3AED'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: size,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.5 - 0.02,
      baseAlpha: Math.random() * 0.6 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.8 + 0.2,
      color,
      parallax: Math.random() * 0.06 + 0.02
    };
  }

  private animateParticles = (time: number) => {
    if (!this.bgCtx || !this.bgCanvas) return;
    const dt = Math.min(0.06, (time - this.lastTime) / 1000);
    this.lastTime = time;
    const ctx = this.bgCtx;
    const w = this.bgCanvas.width / (window.devicePixelRatio || 1);
    const h = this.bgCanvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    const scrollOffset = window.scrollY || window.pageYOffset || 0;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // drift and smooth movement
      p.x += p.vx * (1 + Math.sin(time * 0.0002 + i) * 0.3) * 40 * dt;
      p.y += p.vy * (1 + Math.cos(time * 0.00015 + i) * 0.4) * 40 * dt;

      // subtle pulse
      p.alpha = p.baseAlpha + Math.sin(time * 0.001 * p.pulseSpeed + i) * 0.15;

      // parallax on render influenced by scroll
      const py = p.y + scrollOffset * p.parallax;

      // wrap around edges to make continuous canvas
      if (p.x < -50) p.x = w + 50;
      if (p.x > w + 50) p.x = -50;
      if (py < -80) p.y = h + 80 - scrollOffset * p.parallax;
      if (py > h + 80) p.y = -80 - scrollOffset * p.parallax;

      // draw glow
      const grd = ctx.createRadialGradient(p.x, py, 0, p.x, py, p.r * 12);
      grd.addColorStop(0, `rgba(255,255,255,${Math.max(0.03, Math.min(0.18, p.alpha))})`);
      grd.addColorStop(0.2, p.color ? `${this.hexToRgba(p.color, Math.max(0.06, p.alpha * 0.25))}` : `rgba(0,212,255,0.06)`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x, py, p.r * 8, 0, Math.PI * 2);
      ctx.fill();
    }

    this.particleAnimId = requestAnimationFrame(this.animateParticles);
  };

  private hexToRgba(hex: string, alpha: number) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }
}
