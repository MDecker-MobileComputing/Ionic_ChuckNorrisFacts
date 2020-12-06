import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Seite2Page } from './seite2.page';

describe('Seite2Page', () => {
  let component: Seite2Page;
  let fixture: ComponentFixture<Seite2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Seite2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Seite2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
