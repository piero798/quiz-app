import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models';
import { TriviaService } from '../services/trivia.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  /**
   * Questions
   */
  public questions: Question[] = [];
  /**
   * Score
   */
  public score = 0;

  constructor(
    private _triviaService: TriviaService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.questions = this._triviaService.submittedAnswers;
    this.score = this.questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
  }

  /**
   * Creates a new quiz
   */
  public newQuiz() {
    this._triviaService.submittedAnswers = [];
    this.router.navigate(['/quiz']);
  }
}
