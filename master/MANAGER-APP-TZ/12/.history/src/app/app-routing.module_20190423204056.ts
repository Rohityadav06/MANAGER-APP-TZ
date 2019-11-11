import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'center', loadChildren: './pages/center/center.module#CenterPageModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule' },
  { path: 'payment', loadChildren: './pages/payment/payment.module#PaymentPageModule' },
  { path: 'assessment', loadChildren: './pages/assessment/assessment.module#AssessmentPageModule' },
  { path: 'community', loadChildren: './pages/community/community.module#CommunityPageModule' },
  { path: 'issues', loadChildren: './pages/issues/issues.module#IssuesPageModule' },
  { path: 'expense', loadChildren: './pages/expense/expense.module#ExpensePageModule' },
  { path: 'message', loadChildren: './pages/message/message.module#MessagePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
