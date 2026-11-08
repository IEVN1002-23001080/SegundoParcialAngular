
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestrosComponent } from './maestros';

describe('MaestrosComponent', () => {
  let component: MaestrosComponent;
  let fixture: ComponentFixture<MaestrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaestrosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaestrosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
