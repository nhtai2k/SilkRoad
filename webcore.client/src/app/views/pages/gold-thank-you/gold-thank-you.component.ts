import { Component } from '@angular/core';

@Component({
  selector: 'app-gold-thank-you',
  imports: [],
  templateUrl: './gold-thank-you.component.html',
  styleUrl: './gold-thank-you.component.scss'
})
export class GoldThankYouComponent {
  language: string = 'EN';

  constructor() { }

  handleChangeLanguage() {
    if (this.language === 'EN') {
      this.language = 'VN';
    } else {
      this.language = 'EN';
    }
  }

}
