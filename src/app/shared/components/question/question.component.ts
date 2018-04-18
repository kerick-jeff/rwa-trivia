import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Question, Answer } from '../../../model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, appState, categoryDictionary } from '../../../store';
import { QuestionActions } from '../../../../app/core/store/actions';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {
  @Input() question: Question;

  questionForm: FormGroup;
  @Output() answerClicked = new EventEmitter<number>();
  @Output() continueClicked = new EventEmitter();

  answeredIndex: string;
  correctAnswerIndex: string;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private questionAction: QuestionActions) {
    this.answeredIndex = '';
    this.correctAnswerIndex = '';
    this.store.select(appState.coreState).select(s => s.questionOfTheDay).subscribe(questionOfTheDay => {
    });
  }

  ngOnChanges() {
    if (this.question.questionText !== undefined) {
      this.question.answers.forEach((item, index) => {
        if (item.correct === true) {
          this.correctAnswerIndex = item.answerText;
        }
      });

    }
  }

  answerButtonClicked(answer: Answer, index: number) {
    if (this.answeredIndex !== '')
      return;
    const answerObj = this.question.answers.filter((obj) => obj.id === answer.id)[0];
    this.answeredIndex = answer.answerText;
    this.answerClicked.emit(index);
  }

  getNextQuestion() {
    this.answeredIndex = '';
    this.correctAnswerIndex = '';
    this.store.dispatch(this.questionAction.getQuestionOfTheDay());

  }

}
