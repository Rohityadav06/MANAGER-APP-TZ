import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninManagerPage } from './signin-manager.page';

describe('SigninManagerPage', () => {
  let component: SigninManagerPage;
  let fixture: ComponentFixture<SigninManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
