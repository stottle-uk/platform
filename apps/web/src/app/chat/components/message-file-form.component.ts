import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  SendbirdMessageFileFormComponent,
  SendFileMessage
} from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-message-file-form',
  template: `
    <form [formGroup]="messageForm" (ngSubmit)="formSubmit()">
      <input type="file" #fileInput />

      <button type="submit" color="primary">Send</button>
    </form>
  `
})
export class MessageFileFormComponent
  implements SendbirdMessageFileFormComponent {
  @Output()
  messageSubmit = new EventEmitter<SendFileMessage>();

  @ViewChild('fileInput')
  fileInput: ElementRef<HTMLInputElement>;

  get fileControl(): AbstractControl {
    return this.messageForm.controls.file;
  }

  messageForm = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  @HostListener('change', ['$event.target.files'])
  onFilesSelected(files: FileList): void {
    this.fileControl.patchValue(files.item(0));
  }

  formSubmit(): void {
    if (this.messageForm.valid) {
      this.messageSubmit.emit(this.messageForm.value);
      this.fileInput.nativeElement.value = '';
    }
  }
}
