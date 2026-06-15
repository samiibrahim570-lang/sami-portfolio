import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'ERP / Flour Management System',
      desc: 'Complete enterprise solution covering sales, inventory, finance, and multi-dimensional reporting. Handles SKU-wise tracking, supplier management, and real-time dashboards.',
      icon: '🏭',
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'ERP'],
      highlights: ['Sales & Inventory Module', 'Financial Statements', 'SKU-wise Reporting', 'Role-Based Access'],
      color: '#00D4FF'
    },
    {
      title: 'Doctor Management System',
      desc: 'Comprehensive healthcare management platform featuring appointment scheduling, patient records management, prescriptions, and detailed medical reporting.',
      icon: '🏥',
      tags: ['Angular', 'C#', 'PostgreSQL', 'REST API'],
      highlights: ['Appointment Scheduling', 'Patient Records', 'Medical Reporting', 'Prescription Mgmt'],
      color: '#22c55e'
    },
    {
      title: 'Construction Management System',
      desc: 'End-to-end construction project tracking system with finance management, contractor workflows, material procurement, and milestone-based progress tracking.',
      icon: '🏗️',
      tags: ['Angular', 'ASP.NET Core', 'Entity Framework', 'SQL Server'],
      highlights: ['Project Tracking', 'Contractor Workflows', 'Finance Module', 'Material Management'],
      color: '#FFD700'
    },
    {
      title: 'Finance & Accounting System',
      desc: 'Full-featured accounting platform with general ledgers, voucher management, invoice generation, and comprehensive financial statement reports.',
      icon: '💰',
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'JWT'],
      highlights: ['General Ledger', 'Voucher System', 'Invoice Management', 'Financial Reports'],
      color: '#7C3AED'
    }
  ];
}
