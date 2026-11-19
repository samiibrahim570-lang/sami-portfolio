import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { Magnetic, Reveal, Tilt } from '../../shared/directives';
import { PROJECTS } from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  imports: [Icon, Magnetic, Reveal, Tilt],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly featuredList = PROJECTS.filter((p) => p.featured);
  protected readonly others = PROJECTS.filter((p) => !p.featured);
}
