import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '../services/trivia.service';
import { Category, Question } from './../models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  /**
   * Amount of questions
   */
  private readonly _amountOfQuestions = 5;
  /**
   * Questions type
   */
  private readonly _questionType = 'multiple';
  /**
   * Specifies if the user can submit
   */
  public canSubmit = false;
  /**
   * Categories
   */
  public categories: Category[] = [];
  /**
   * Category selected
   */
  public categorySelected: number;
  /**
   * Difficulty selected
   */
  public difficultySelected: string;
  /**
   * Specifies if is loading the questions
   */
  public isLoadingQuestions = false;
  /**
   * Questions
   */
  public questions: Question[] = [];

  constructor(
    private _triviaService: TriviaService,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    this.categories = await this._triviaService.getCategories();
  }

  /**
   * Fired on quiz created
   */
  public async onCreate(): Promise<void> {
    if (this.categorySelected && this.difficultySelected) {
      this.canSubmit = false;
      this.isLoadingQuestions = true;
      this.questions = await this._triviaService.getQuestions(this._amountOfQuestions, this.categorySelected, this.difficultySelected, this._questionType);
      this.isLoadingQuestions = false;
    }
  }

  /**
   * Fired on answer select
   * @param question Question
   * @param answerIndex Answer index
   */
  public onSelectedAnswer(question: Question, answerIndex: number): void {
    question.selectedAnswer = answerIndex;
    this.canSubmit = this.questions.every(q => q.selectedAnswer !== undefined);
  }

  /**
   * Fired on answers submitted
   */
  public onSubmit(): void {
    this._triviaService.submittedAnswers = this.questions;
    this.router.navigate(['/result']);
  }

}
