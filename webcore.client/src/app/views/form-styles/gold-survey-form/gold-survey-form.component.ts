import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ELanguages, EQuestionTypes } from '@common/global';
import { AnswerModel } from '@models/survey-models/answer.model';
import { ParticipantService } from '@services/survey-services/participant.service';
import { ParticipantInfoComponent } from '@components/participant-info/participant-info.component';
import { ParticipantInfoModel } from '@models/survey-models/participant-info.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
import { QuestionModel } from '@models/survey-models/question.model';

@Component({
  selector: 'app-gold-survey-form',
  imports: [CommonModule, ReactiveFormsModule, ParticipantInfoComponent],
  templateUrl: './gold-survey-form.component.html',
  styleUrl: './gold-survey-form.component.scss'
})
export class GoldSurveyFormComponent implements OnInit {
  //#region Properties
  @Input() surveyForm!: SurveyFormModel;
  @Input() isReviewMode: boolean = false;
  @ViewChild('participantInfoComponent') participantInfoComponent!: ParticipantInfoComponent;
  eLanguages = ELanguages;
  selectedLanguage: string = ELanguages.Vietnamese;
  questionTypes: any = EQuestionTypes;
  initParticipant: boolean = false;
  finished: boolean = false;
  currentPaticipantId = signal<string>('');
  answerList: AnswerModel[] = [];
  numberOfQuestions: number = 0;
  // participantInfos: ParticipantInfoModel[] = [];
  //#endregion
  
  //#region Constructor
  constructor(
    private route: ActivatedRoute,
    private surveyFormService: SurveyFormService,
    private participantService: ParticipantService,
    private router: Router
  ) { }
  ngOnInit(): void {
   this.numberOfQuestions =
    (
      (this.surveyForm.questionGroups.reduce(
        (total, group) => total + (group.questions.length || 0),
        0
      ) || 0)
      +
      (this.surveyForm.questions.length || 0)
    );
  }

  handleChangeLanguage() {
    this.selectedLanguage = this.selectedLanguage === ELanguages.Vietnamese ? ELanguages.English : ELanguages.Vietnamese;
  }
  //#endregion
  
  //#region Event Handlers

  onUpdateCurrentParticipantId(id: string): void {
    this.currentPaticipantId.set(id);
    console.log('Updated Participant ID:', id);
  }


  navigateToThankYouPage(): void {
    // Here you can handle the final submission logic, e.g., send data to the server
    this.router.navigate(['gold-thank-you']);
  }
  //#endregion

  //#region participant info
  trigger(): void {
    if(this.surveyForm.participantInfoConfigs && this.surveyForm.participantInfoConfigs.length > 0){
      this.participantInfoComponent.onSubmit();
    }else{
      this.submitParticipant([]);
    }
  }

  submitParticipant(participantInfos: ParticipantInfoModel[]): void {
    const data: ParticipantModel = {
      id: undefined,
      surveyFormId: this.surveyForm.id || 0,
      participantInfos: participantInfos,
      isReviewMode: this.isReviewMode
    }
    this.participantService.initParticipant(data).subscribe({
      next: (res) => {
        this.currentPaticipantId.set(res.data.id);
        this.initParticipant = true;
      },
      error: (err) => {
        console.error('Error initializing participant:', err);
      }
    });
  }
  //#endregion
  //#region Suvvey Content
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
          participantId: this.currentPaticipantId(),
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
          participantId: this.currentPaticipantId(),
          questionGroupId: question.questionGroupId,
          questionId: question.id || '',
          questionTypeId: question.questionTypeId,
          answer: event.target.value
        });
      }
    }
  
      onSubmitParticipantForm(): void {
    console.log('Final Submitted Answers:', this.answerList);
    this.participantService.addAnswers(this.answerList).subscribe({
      next: (res) => {
        console.log('Answers submitted successfully:', res);
        this.navigateToThankYouPage();
      },
      error: (err) => {
        console.error('Error submitting answers:', err);
      }
    });
  }
  //#endregion
}
