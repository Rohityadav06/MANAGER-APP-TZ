import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MessagePage } from './message.page';
import { LoadingPage } from 'src/app/loading/loading.page';



const routes: Routes = [
  {
    path: '',
    component: MessagePage
  }
];

@NgModule({
  imports: [
    AccordionModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagePage,LoadingPage]
})
export class MessagePageModule {}
