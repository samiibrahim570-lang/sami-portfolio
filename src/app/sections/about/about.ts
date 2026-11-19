import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { Reveal, Tilt } from '../../shared/directives';
import { PROFILE, STRENGTHS } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [Icon, Reveal, Tilt],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly p = PROFILE;
  protected readonly strengths = STRENGTHS;
  protected readonly highlights = [
    'JWT Authentication & Role-Based Authorization',
    'Clean Architecture & RESTful API Design',
    'SQL Server & PostgreSQL Performance Tuning',
    'Healthcare Workflows — EMR, DSS & LAB',
    'AI Integration & AI Agents (LLM-powered assistants)',
    'ASP.NET MVC, Web API & Third-party API Integration',
    'Mentoring Junior Developers',
  ];
}
