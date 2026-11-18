import { Component, signal } from '@angular/core';
import { Icon } from '../../shared/icon';
import { Reveal, Tilt } from '../../shared/directives';
import { SKILL_GROUPS, SkillGroup, TECH_MARQUEE } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [Icon, Reveal, Tilt],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly marquee = [...TECH_MARQUEE, ...TECH_MARQUEE];
  protected activeTab = signal(0);

  protected avg(g: SkillGroup) {
    return Math.round(g.skills.reduce((s, x) => s + x.level, 0) / g.skills.length);
  }
}
