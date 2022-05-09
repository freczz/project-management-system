import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ITasks } from 'src/app/interfaces/interfaces';
import { setColumnFormGroup } from 'src/app/utilities/utils';

@Component({
  selector: 'pms-modal-edit-form',
  templateUrl: './modal-edit-form.component.html',
  styleUrls: ['./modal-edit-form.component.scss'],
})
export default class ModalEditFormComponent {
  @Input() task!: ITasks;

  public isExpanded: boolean = false;

  public isHide: boolean = false;

  public formGroup: FormGroup = setColumnFormGroup();

  public onSubmit(form: FormGroupDirective): void {
    if (this.formGroup.controls['description'].value) {
      this.resetForm(form);
    }
  }

  public resetForm(form: FormGroupDirective): void {
    this.isExpanded = this.isExpanded === false;
    form.resetForm();
  }
}
