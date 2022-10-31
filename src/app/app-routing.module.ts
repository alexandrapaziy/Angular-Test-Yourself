import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewTestsComponent } from './pages/admin/view-tests/view-tests.component';
import { AddTestComponent } from './pages/admin/add-test/add-test.component';
import { UpdateTestComponent } from './pages/admin/update-test/update-test.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadTestComponent } from './pages/user/load-test/load-test.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { AbstractComponent } from './pages/user/abstract/abstract.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'tests',
        component: ViewTestsComponent,
      },
      {
        path: 'add-test',
        component: AddTestComponent,
      },
      {
        path: 'test/:testId',
        component: UpdateTestComponent,
      },
      {
        path: 'view-questions/:testId/:title',
        component: ViewQuestionsComponent,
      },
      {
        path: 'add-question/:testId/:title',
        component: AddQuestionComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: ':categoryId',
        component: LoadTestComponent,
      },
      {
        path: 'instructions/:testId',
        component: InstructionsComponent,
      },
      {
        path: 'abstract/:testId',
        component: AbstractComponent,
      },
    ],
  },
  {
    path: 'start/:testId',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
