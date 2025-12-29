// import { NgFor, NgIf } from '@angular/common';
// import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { baseUrl } from '@common/global';
// import { CardComponent, CollapseDirective, TableColorDirective } from '@coreui/angular';
// import { IconDirective } from '@coreui/icons-angular';
// import { DishGroupModel } from '@models/bom-models/dish-group.model';

// @Component({
//   selector: 'app-dish-group-tree',
//   templateUrl: './dish-group-tree.component.html',
//   standalone: true,
//   imports: [
//  NgFor, NgIf,ReactiveFormsModule,IconDirective,
//      CollapseDirective, CardComponent,TableColorDirective
//   ]
// })
// export class DishGroupTreeComponent implements OnChanges{

//   @Input() groups: DishGroupModel[] = [];
//   baseUrl: string = baseUrl;
//   @Input() toggleLiveCreateModel!: (parentId: number | null) => void;
//   @Input() updateData!: (id: number) => void;
//   @Input() softDeleteData!: (id: number) => void;
//   @Input() icons: any;
//   visibleSubItems = signal<{ [id: number]: boolean }>({});
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['groups']) {
//        // Reset visibleSubItems for fresh data
//       const subItems: { [id: number]: boolean } = {};
//       this.groups.forEach((item: DishGroupModel) => {
//         if (item.children && item.children.length > 0) {
//           subItems[item.id] = false;
//         }
//       });
//       this.visibleSubItems.set(subItems);
//     }
//   }
//   showSubItems(id: number) {
//     const current = this.visibleSubItems();
//     this.visibleSubItems.set({ ...current, [id]: !current[id] });
//   }
// }
