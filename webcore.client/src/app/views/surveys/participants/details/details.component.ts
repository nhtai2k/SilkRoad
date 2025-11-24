import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantModel } from '@models/survey-models/participant.model';
import { ParticipantService } from '@services/survey-services/participant.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  participant!: ParticipantModel;

  constructor(private route: ActivatedRoute, private router: Router,
    private participantService: ParticipantService) { }
  ngOnInit(): void {
    const participantId = this.route.snapshot.paramMap.get('id');
    if (participantId) {
      this.participantService.getById(participantId).subscribe({
        next: (response) => {
          this.participant = response.data;
          console.log('Participant details:', this.participant);
        },
        error: (error) => {
          console.error('Error fetching participant details:', error);
          this.router.navigate(['/surveys/participants']);
        }
      });
    } else {
      this.router.navigate(['/surveys/participants']);
    }

  }

}
