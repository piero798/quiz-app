import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitGuard } from './guards/submit.guard';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  // { path: 'result/:questions', component: ResultComponent },
  { path: 'result', component: ResultComponent, canActivate: [SubmitGuard] },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
  { path: '**', redirectTo: '/quiz' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
