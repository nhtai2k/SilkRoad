import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor, Toolbar, ToolbarItem } from 'ngx-editor';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-text-editor',
  imports: [NgxEditorComponent, NgxEditorMenuComponent, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true
    }
  ]
})
export class TextEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string = 'Type here...';
  @Input() html: string = '';
  // @Input() height: string = '300px';
  @Input() disabled: boolean = false;
  @Input() toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ] as ToolbarItem[][];

  @Output() contentChange = new EventEmitter<string>();

  editor!: Editor;

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onContentChange(content: string): void {
    this.html = content;
    this.onChange(content);
    this.contentChange.emit(content);
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.html = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}