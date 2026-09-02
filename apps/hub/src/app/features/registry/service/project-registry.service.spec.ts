import { TestBed } from '@angular/core/testing';

import { ProjectRegistryService } from './project-registry.service';

describe('ProjectRegistryService', () => {
  let service: ProjectRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

