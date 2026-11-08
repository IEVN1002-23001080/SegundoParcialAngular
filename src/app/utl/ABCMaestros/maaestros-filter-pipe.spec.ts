import { TestBed } from '@angular/core/testing';
import { MaestrosFilterPipe } from './maestros-filter-pipe';

describe('MaestrosFilterPipe', () => {
  let pipe: MaestrosFilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaestrosFilterPipe]
    });

    pipe = TestBed.inject(MaestrosFilterPipe);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });
});