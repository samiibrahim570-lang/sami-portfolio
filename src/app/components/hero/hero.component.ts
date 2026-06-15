import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  displayText = '';
  titles = ['Full Stack Developer', 'Angular Expert', 'ASP.NET Core Dev', 'ERP Specialist'];
  currentTitleIndex = 0;
  isDeleting = false;
  typeInterval: any;

  ngOnInit() {
    this.startTyping();
  }

  startTyping() {
    let charIndex = 0;
    const currentTitle = this.titles[this.currentTitleIndex];

    const type = () => {
      if (!this.isDeleting) {
        if (charIndex <= currentTitle.length) {
          this.displayText = currentTitle.slice(0, charIndex++);
          this.typeInterval = setTimeout(type, 80);
        } else {
          this.typeInterval = setTimeout(() => {
            this.isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        if (charIndex > 0) {
          this.displayText = currentTitle.slice(0, --charIndex);
          this.typeInterval = setTimeout(type, 40);
        } else {
          this.isDeleting = false;
          this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
          charIndex = 0;
          this.typeInterval = setTimeout(type, 300);
        }
      }
    };

    type();
  }

  ngOnDestroy() {
    clearTimeout(this.typeInterval);
  }
}
