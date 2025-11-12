import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { ELanguages, EQuestionTypes } from '@common/global';
import { AnswerModel } from '@models/survey-models/answer.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';

@Component({
  selector: 'app-survey-content',
  imports: [CommonModule],
  templateUrl: './survey-content.component.html',
  styleUrl: './survey-content.component.scss'
})
export class SurveyContentComponent implements OnInit {  
  eLanguages = ELanguages;
  selectedLanguage = input<string>();
  participantId = input<string>();
  initSurveyForm = input<SurveyFormModel | null>();
  onSubmitParticipantForm = output<AnswerModel[]>();
  surveyForm: SurveyFormModel | null = null;
  questionTypes : any = EQuestionTypes;
  answerList: AnswerModel[] = [];
  numberOfQuestions: number = 0;
  
  ngOnInit(): void {
    this.surveyForm = this.initSurveyForm() || null;
    this.numberOfQuestions =
    (
      (this.surveyForm?.questionGroups?.reduce(
        (total, group) => total + (group.questions?.length || 0),
        0
      ) || 0)
      +
      (this.surveyForm?.questions?.length || 0)
    );
  }
// Xử lý khi người dùng chọn câu trả lời. Dành cho câu hỏi lựa chọn
  handleChooseAnswer(question: QuestionModel, answerId: any, rating: number) {
    const questionElement = document.getElementById(`question_${question.id}`);
    if (!questionElement) return;
    // Bỏ selected khỏi answer đã chọn trước đó
    questionElement.querySelectorAll('.labelAnswer.selected')
      .forEach(el => el.classList.remove('selected'));
    document.getElementById(`predefinedAnswerLabel_${answerId}`)?.classList.add('selected');
    // Cập nhật answerList
    const existingAnswerIndex = this.answerList.findIndex(a => a.questionId === question.id);
    if (existingAnswerIndex !== -1) {
      this.answerList[existingAnswerIndex].answerId = answerId;
      this.answerList[existingAnswerIndex].rating = rating;
    } else {
      this.answerList.push({
        participantId: this.participantId() || '',
        questionGroupId: question.questionGroupId,
        questionId: question.id || '',
        questionTypeId: question.questionTypeId,
        answerId: answerId,
        rating: rating
      });
    }
  }

  //Xử lý khi người dùng điền câu trả lời. Dành cho câu hỏi dạng text
  handleInputAnswer(question: QuestionModel, event: any) {
    const value = event.target.value;
    const existingAnswerIndex = this.answerList.findIndex(a => a.questionId === question.id);
    if (!value || value.trim() === '') {
      // Nếu giá trị rỗng, xóa câu trả lời khỏi danh sách
      if (existingAnswerIndex !== -1) {
        this.answerList.splice(existingAnswerIndex, 1);
      }
    }
    if (existingAnswerIndex !== -1) {
      this.answerList[existingAnswerIndex].answer = event.target.value;
    } else {
      this.answerList.push({
        participantId: this.participantId() || '',
        questionGroupId: question.questionGroupId,
        questionId: question.id || '',
        questionTypeId: question.questionTypeId,
        answer: event.target.value
      });
    }
  }

  handleFinishSurvey() {
    this.onSubmitParticipantForm.emit(this.answerList);
  }

}
