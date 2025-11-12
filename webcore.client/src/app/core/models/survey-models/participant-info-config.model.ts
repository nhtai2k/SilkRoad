export interface ParticipantInfoConfigModel {
  id: string; 
  surveyFormId: number;
  fieldNameEN: string;
  fieldNameVN: string;
  placeholderEN?: string;
  placeholderVN?: string;
  typeId: number;
  priority: number;
  minLength: number;
  maxLength: number;
  isRequired: boolean;
}