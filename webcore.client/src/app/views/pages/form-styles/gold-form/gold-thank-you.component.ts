import { Component } from '@angular/core';
import { ELanguages } from '@common/global';

@Component({
  selector: 'app-gold-thank-you',
  imports: [],
  templateUrl: './gold-thank-you.component.html',
  styleUrl: './gold-survey-form.component.scss'
})
export class GoldThankYouComponent {
  eLanguages = ELanguages;
  selectedLanguage: string = ELanguages.Vietnamese;

  constructor() { }

  handleChangeLanguage() {
    this.selectedLanguage = this.selectedLanguage === ELanguages.Vietnamese ? ELanguages.English : ELanguages.Vietnamese;
  }
}
