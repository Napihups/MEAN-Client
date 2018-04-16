import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnlineStatsComponent } from './user-online-stats.component';

describe('UserOnlineStatsComponent', () => {
  let component: UserOnlineStatsComponent;
  let fixture: ComponentFixture<UserOnlineStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOnlineStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOnlineStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
