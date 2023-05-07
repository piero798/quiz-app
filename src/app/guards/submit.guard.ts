import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TriviaService } from '../services/trivia.service';

@Injectable({
  providedIn: 'root'
})
export class SubmitGuard implements CanActivate {

  constructor(
    private _triviaService: TriviaService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const submittedAnswers = this._triviaService.submittedAnswers;
    const canNavigate = submittedAnswers && submittedAnswers.length > 0 && submittedAnswers.every(q => q && q.selectedAnswer !== undefined);
    return canNavigate ? true : this.router.navigate(['']);
  }

}
