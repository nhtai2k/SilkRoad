import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent } from '@coreui/angular';

@Component({
  selector: 'app-view',
  imports: [ CardComponent, CardBodyComponent, ButtonDirective, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
  }

  

}
