import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingSidebarComponent } from './setting-sidebar.component';

describe('SettingSidebarComponent', () => {
  let component: SettingSidebarComponent;
  let fixture: ComponentFixture<SettingSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSidebarComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
