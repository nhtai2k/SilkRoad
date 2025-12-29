import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent, CollapseDirective, TableColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LocationModel } from '@models/bom-models/location.model';
import { AreaComponent } from "../area/area.component";
import { baseUrl } from '@common/global';

@Component({
  selector: 'app-location',
  imports: [
    NgFor, NgIf, ReactiveFormsModule, IconDirective,
    CollapseDirective, CardComponent, TableColorDirective,
    AreaComponent
],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent  implements OnChanges {
  baseUrl: string = baseUrl;
  @Input() data: LocationModel[] = [];
  @Input() toggleLiveCreateModel!: (parentId: number | null) => void;
  @Input() updateData!: (id: number, type: string) => void;
  @Input() softDeleteData!: (id: number, type: string) => void;
  @Input() icons: any;
  visibleSubItems = signal<{ [id: number]: boolean }>({});
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      // Reset visibleSubItems for fresh data
      const subItems: { [id: number]: boolean } = {};
      this.data.forEach((item: LocationModel) => {
        if (item.areas && item.areas.length > 0) {   
            subItems[item.id] = false;
        }
      });
      this.visibleSubItems.set(subItems);
    }
  }
  showSubItems(id: number) {
    const current = this.visibleSubItems();
    this.visibleSubItems.set({ ...current, [id]: !current[id] });
  }
}