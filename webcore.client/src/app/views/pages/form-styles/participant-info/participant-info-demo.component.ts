// import { Component } from '@angular/core';
// import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
// import { ParticipantInfoComponent } from './participant-info.component';
// import { CommonModule } from '@angular/common';
// import { EFieldTypes } from '@common/global';

// @Component({
//   selector: 'app-participant-info-demo',
//   standalone: true,
//   imports: [CommonModule, ParticipantInfoComponent],
//   template: `
//     <div class="container-fluid">
//       <div class="row">
//         <div class="col-12">
//           <div class="card">
//             <div class="card-header">
//               <h5 class="card-title mb-0">Participant Information Form Demo</h5>
//             </div>
//             <div class="card-body">
//               <div class="mb-3">
//                 <label class="form-label">Language:</label>
//                 <div class="btn-group" role="group">
//                   <button 
//                     type="button" 
//                     class="btn btn-outline-primary"
//                     [class.active]="selectedLanguage === 'EN'"
//                     (click)="selectedLanguage = 'EN'">
//                     English
//                   </button>
//                   <button 
//                     type="button" 
//                     class="btn btn-outline-primary"
//                     [class.active]="selectedLanguage === 'VN'"
//                     (click)="selectedLanguage = 'VN'">
//                     Tiếng Việt
//                   </button>
//                 </div>
//               </div>
              
//               <app-participant-info 
//                 [selectedLanguage]="selectedLanguage"
//                 [participantFields]="sampleParticipantFields">
//               </app-participant-info>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .btn-group .btn.active {
//       background-color: #0d6efd;
//       color: white;
//       border-color: #0d6efd;
//     }
    
//     .card {
//       border: 1px solid #dee2e6;
//       border-radius: 0.375rem;
//       box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
//     }
    
//     .card-header {
//       background-color: #f8f9fa;
//       border-bottom: 1px solid #dee2e6;
//       padding: 1rem 1.5rem;
//     }
    
//     .card-body {
//       padding: 1.5rem;
//     }
//   `]
// })
// export class ParticipantInfoDemoComponent {
//   selectedLanguage: string = 'EN';
  
//   sampleParticipantFields: ParticipantInfoConfigModel[] = [
//     {
//       id: 'full_name',
//       surveyFormId: 1,
//       fieldNameEN: 'Full Name',
//       fieldNameVN: 'Họ và tên',
//       placeholderEN: 'Enter your full name',
//       placeholderVN: 'Nhập họ và tên của bạn',
//       typeId: EFieldTypes.Text,
//       priority: 1,
//       minLength: 2,
//       maxLength: 100,
//       isRequired: true
//     },
//     {
//       id: 'email',
//       surveyFormId: 1,
//       fieldNameEN: 'Email Address',
//       fieldNameVN: 'Địa chỉ email',
//       placeholderEN: 'Enter your email address',
//       placeholderVN: 'Nhập địa chỉ email của bạn',
//       typeId: EFieldTypes.Email,
//       priority: 2,
//       minLength: 0,
//       maxLength: 255,
//       isRequired: true
//     },
//     {
//       id: 'phone',
//       surveyFormId: 1,
//       fieldNameEN: 'Phone Number',
//       fieldNameVN: 'Số điện thoại',
//       placeholderEN: 'Enter your phone number',
//       placeholderVN: 'Nhập số điện thoại của bạn',
//       typeId: EFieldTypes.PhoneNumber,
//       priority: 3,
//       minLength: 0,
//       maxLength: 20,
//       isRequired: false
//     },
//     {
//       id: 'age',
//       surveyFormId: 1,
//       fieldNameEN: 'Age',
//       fieldNameVN: 'Tuổi',
//       placeholderEN: 'Enter your age',
//       placeholderVN: 'Nhập tuổi của bạn',
//       typeId: EFieldTypes.Number,
//       priority: 4,
//       minLength: 0,
//       maxLength: 3,
//       isRequired: true
//     },
//     {
//       id: 'birth_date',
//       surveyFormId: 1,
//       fieldNameEN: 'Date of Birth',
//       fieldNameVN: 'Ngày sinh',
//       placeholderEN: '',
//       placeholderVN: '',
//       typeId: EFieldTypes.Date,
//       priority: 5,
//       minLength: 0,
//       maxLength: 0,
//       isRequired: false
//     },
//     {
//       id: 'bio',
//       surveyFormId: 1,
//       fieldNameEN: 'Biography',
//       fieldNameVN: 'Tiểu sử',
//       placeholderEN: 'Tell us about yourself',
//       placeholderVN: 'Hãy kể về bản thân bạn',
//       typeId: EFieldTypes.TextArea,
//       priority: 6,
//       minLength: 0,
//       maxLength: 500,
//       isRequired: false
//     }
//   ];
// }