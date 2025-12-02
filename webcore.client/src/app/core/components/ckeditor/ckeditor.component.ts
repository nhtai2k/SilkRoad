/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdAzPCkAsc4AYAcUCsnkCcOAjMVCCHCOuVnFFugegOwtpTHLJIQCmAOyTowwYmBEjxUgLqQAZnD4ATYi3QQZQA=
 */

import { Component, EventEmitter, Input, Output, ViewEncapsulation, type OnInit } from '@angular/core';

// import { loadCKEditorCloud, CKEditorModule, type CKEditorCloudResult, type CKEditorCloudConfig, ChangeEvent } from '@ckeditor/ckeditor5-angular';

// import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';

// const LICENSE_KEY =
// 	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzQ4Mjg3OTksImp0aSI6IjE2MjMwN2JlLTNmNTAtNDJhMS05ZjA3LTE2NTNiMzhlY2VhYiIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiQk9YIl0sInZjIjoiMjViYzJhZTEifQ.7ubAJqLahpd1Gr_wV5pXJ2hP7EuI1VyWUGA0y8edbco3dShWggCVi7AypWVpPgZ4VQguA2i7JbTjUOS5tlpTOw';

// const cloudConfig = {
// 	version: '44.3.0'
// } satisfies CKEditorCloudConfig;

@Component({
	selector: 'app-ckeditor',
	standalone: true,
	imports: [],
	templateUrl: './ckeditor.component.html',
	styleUrl: './ckeditor.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class CkeditorComponent{

	@Input() initialData: string = '';
	@Output() result: EventEmitter<string> = new EventEmitter<string>();

}
