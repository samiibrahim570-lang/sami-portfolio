import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { Reveal, Tilt } from '../../shared/directives';
import { PROJECTS } from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  imports: [Icon, Reveal, Tilt],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly featured = PROJECTS.find((p) => p.featured)!;
  protected readonly others = PROJECTS.filter((p) => !p.featured);
}
