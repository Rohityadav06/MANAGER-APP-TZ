import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SigninManagerPage } from './signin-manager.page';
import { LoadingPageModule } from '../loading/loading.module';
import { LoadingPage } from '../loading/loading.page';

const routes: Routes = [
  {
    path: '',
    component: SigninManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SigninManagerPage,LoadingPage]
})
export class SigninManagerPageModule {}
