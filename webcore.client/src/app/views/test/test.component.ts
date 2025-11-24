import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  imports: []
})
export class TestComponent {
    createForm: FormGroup = new FormGroup({
    shiftId: new FormControl(1),
    name: new FormControl('Com Anh Hai'),
    inventory: new FormControl(1),
    wholesalePrice: new FormControl(4),
    retailPrice: new FormControl(5)
  });
  imageFile: File | null = null;
  constructor(private http: HttpClient) {}
  onFileSelected(event: any){
    const file: File = event.target.files[0];
    this.imageFile = file;
  }
  submit(){
    const url = 'https://cara-api-dev.nextwaves.asia/api/services/app/DishService/Create';
    const formData: FormData = new FormData();
    const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBzYWRlYy5jbyIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiNmYyN2M4MTctNzQ1MC1jZjFhLWM0ZWMtMzlmNDUzMGM3MGQxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlNUQUZGIiwiSFIiLCJBZG1pbiJdLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiNGM5MmNiNjEtODRmZC00YTQ1LTk2MzMtZmQ2YmI4NGQ5MGFjIiwiaWF0IjoxNzYzOTUzNTMwLCJTZXNzaW9uVHlwZUlkIjoiMSIsIlNlc3Npb25JZCI6IjEwNSIsIm5iZiI6MTc2Mzk1MzUzMCwiZXhwIjoxODUwMjY3MTMwLCJpc3MiOiJQaWNvU29sdXRpb25fQ09SRVdBTExFVCIsImF1ZCI6IlBpY29Tb2x1dGlvbl9DT1JFV0FMTEVUIn0.XxxXNOeC2KH9wMcxWm95qLiaouxZcV8HFrHr6kkku1E';
    formData.append('shiftId', this.createForm.get('shiftId')?.value);
    formData.append('name', this.createForm.get('name')?.value);
    formData.append('inventory', this.createForm.get('inventory')?.value);
    formData.append('wholesalePrice', this.createForm.get('wholesalePrice')?.value);
    formData.append('retailPrice', this.createForm.get('retailPrice')?.value);
    formData.append('image', this.imageFile ? this.imageFile : '');
    
    const headers = {
      'Authorization': `Bearer ${bearerToken}`
    };
    
    this.http.post(url, formData, { headers }).subscribe((res: any) => {
      console.log(res);
    });
  }
}
