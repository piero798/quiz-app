import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Question, RawCategory, RawQuestion, RawQuestions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  /**
   * Category url
   */
  private readonly _categoryUrl = 'https://opentdb.com/api_category.php';
  /**
   * Questions url
   */
  private readonly _questionsUrl = 'https://opentdb.com/api.php';
  /**
   * Submitted answers
   */
  public submittedAnswers: Question[] = [];

  constructor(private _httpClient: HttpClient) { }

  /**
   * Gets categories
   * @returns Categories
   */
  public async getCategories(): Promise<Category[]> {
    const response = await this._httpClient.get<RawCategory>(this._categoryUrl).toPromise();
    return response && response.trivia_categories || [];
  }

  /**
   * Gets questions
   * @param category Category id
   * @param difficulty Difficulty
   * @returns Questions based on category and difficulty
   */
  public async getQuestions(amount: number, category: number, difficulty: string, questionType: 'multiple' | 'boolean'): Promise<Question[]> {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('category', category.toString())
      .set('difficulty', difficulty)
      .set('type', questionType);
    const response = await this._httpClient.get<RawQuestions>(this._questionsUrl, { params }).toPromise();
    const results = response && response.results || [];
    return results.map(r => this.mapQuestion(r));
  }

  /**
   * Maps raw question
   * @param rawQuestion Raw question
   * @returns Question
   */
  private mapQuestion(rawQuestion: RawQuestion): Question {
    const { correct_answer, incorrect_answers, question } = rawQuestion;
    const answersLength = incorrect_answers.length + 1;
    const answerPosition = Math.floor(Math.random() * answersLength);
    const answers = [...incorrect_answers];
    answers.splice(answerPosition, 0, correct_answer);
    return { answers, correctAnswer: answerPosition, question };
  }
}
