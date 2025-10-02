import { Component } from "@angular/core";
import { TableRowComponent } from "@components/generals/table-row/table-row.component";
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  imports: [TableRowComponent]
})
export class TestComponent {

}
