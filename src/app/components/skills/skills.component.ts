import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillGroups = [
    {
      category: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'Angular 16', level: 95, color: '#DD0031' },
        { name: 'TypeScript', level: 92, color: '#3178C6' },
        { name: 'RxJS', level: 85, color: '#B7178C' },
        { name: 'HTML5 / CSS3', level: 90, color: '#E34F26' },
        { name: 'Tailwind CSS', level: 88, color: '#38BDF8' },
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'ASP.NET Core', level: 92, color: '#512BD4' },
        { name: 'C#', level: 90, color: '#178600' },
        { name: 'Entity Framework', level: 88, color: '#512BD4' },
        { name: 'RESTful APIs', level: 94, color: '#00D4FF' },
        { name: 'JWT Auth', level: 90, color: '#FFD700' },
      ]
    },
    {
      category: 'Database',
      icon: '🗄️',
      skills: [
        { name: 'SQL Server', level: 90, color: '#CC2927' },
        { name: 'PostgreSQL', level: 82, color: '#336791' },
        { name: 'Query Optimization', level: 85, color: '#00D4FF' },
        { name: 'Database Design', level: 88, color: '#FFD700' },
      ]
    },
    {
      category: 'Tools & Practices',
      icon: '🔧',
      skills: [
        { name: 'Clean Architecture', level: 88, color: '#00D4FF' },
        { name: 'ERP Development', level: 92, color: '#FFD700' },
        { name: 'Business Analysis', level: 85, color: '#22c55e' },
        { name: 'QA Collaboration', level: 83, color: '#7C3AED' },
      ]
    }
  ];

  ngOnInit() {}
}
