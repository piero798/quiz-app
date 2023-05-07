import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Question } from './../models';
import { TriviaService } from '../services/trivia.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  /**
   * Categories
   */
  public categories: Category[] = [];
  /**
   * 
   */
  public categorySelected: number;
  public difficultySelected: string;
  public questions: Question[] = [];
  public canSubmit = false;

  constructor(
    private _triviaService: TriviaService,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    this.categories = await this._triviaService.getCategories();
  }

  public async onCreate(): Promise<void> {
    if (this.categorySelected && this.difficultySelected) {
      this.canSubmit = false;
      this.questions = await this._triviaService.getQuestions(this.categorySelected, this.difficultySelected);
    }
  }

  public onSelectedAnswer(question: Question, answerIndex: number): void {
    question.selectedAnswer = answerIndex;
    this.canSubmit = this.questions.every(q => q.selectedAnswer !== undefined);
  }

  public onSubmit(): void {
    this._triviaService.submittedAnswers = this.questions;
    this.router.navigate(['/result']);
    // this.router.navigate(['/result/' + this.questions]);
    // this.router.navigate(['/result'], { queryParams: { questions: this.questions } });
  }

}
