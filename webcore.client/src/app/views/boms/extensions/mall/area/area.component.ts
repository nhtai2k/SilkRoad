import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { baseUrl } from '@common/global';
import { CardComponent, CollapseDirective, TableColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AreaModel } from '@models/bom-models/area.model';
@Component({
  selector: 'app-area',
  imports: [ NgFor, ReactiveFormsModule, IconDirective, TableColorDirective, NgIf],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent{
    baseUrl: string = baseUrl;
  @Input() data: AreaModel[] = [];
  @Input() updateData!: (id: number, type: string) => void;
  @Input() softDeleteData!: (id: number, type: string) => void;
  @Input() icons: any;
}
