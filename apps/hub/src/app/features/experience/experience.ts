import { Component, input } from '@angular/core';
import { ExperienceEntry } from './model/experience.model';

const DEFAULT_ENTRIES: ExperienceEntry[] = [
  {
    role: 'Software Developer',
    company: 'Industrial University of Santander',
    location: 'Bucaramanga, Colombia',
    dateRange: 'Jan 2022 — Present',
    current: true,
    highlights: [
      'Promoted from Systems Assistant to Software Developer, taking ownership of the design, development, and maintenance of institutional software.',
      'Designed database models and built REST APIs with Spring Boot for the SIVIE and Financial Management systems, including paginated endpoints serving 10,000+ records in under five seconds.',
      'Built Angular applications for the Student Payments department, processing and validating data for 5,000+ students with zero support incidents through frequent business requirement changes.',
      "Designed and published reusable Angular components and shared services to the university's internal component library, using modern features like Signals and Router Resolvers.",
      'Investigated and resolved production incidents through root cause analysis, targeted fixes, and controlled deployments to keep systems reliable.',
    ],
  },
];

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly entries = input<ExperienceEntry[]>(DEFAULT_ENTRIES);
}
