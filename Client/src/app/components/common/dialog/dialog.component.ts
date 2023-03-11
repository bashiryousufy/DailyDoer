import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../../services/api.service';
import { Todo } from '../../todo/todo.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public form!: FormGroup;
  isUpdate?: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogType,
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) { }

  ngOnInit() {
    if (this.data.type === 'update') {

      this.isUpdate = true;

      this.form = this.formBuilder.group({
        title: [this.data.todo?.title, [Validators.nullValidator, Validators.required]],
        isDone: [this.data.todo?.isDone, [Validators.nullValidator, Validators.required]],
        description: [this.data.todo?.description, [Validators.nullValidator, Validators.required]],
        createdAt: [this.data.todo?.createdAt, [Validators.nullValidator, Validators.required]]
      });

    } else {

      this.form = this.formBuilder.group({
        title: ["", [Validators.nullValidator, Validators.required]],
        isDone: ["", [Validators.nullValidator, Validators.required]],
        description: ["", [Validators.nullValidator, Validators.required]],
        createdAt: ["", [Validators.nullValidator, Validators.required]]
      });

    }
  }


  get formControl() {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  action() {

    if (this.form.valid) {

      const toDoformData: Todo = {
        title: this.form.value.title,
        description: this.form.value.description,
        isDone: this.form.value.isDone === '1' ? true : false,
        createdAt: this.form.value.createdAt,
        userId: localStorage.getItem('userId')!,
      }

      switch (this.data.type) {
        case "add":
          this.api.createTodo(toDoformData).subscribe((res) => {
            this.dialogRef.close(true);
          });
          break;
        case "update":
          const todo: Todo = this.data.todo!;
          this.api.updateTodo(toDoformData, todo.id!).subscribe((res) => {
            this.dialogRef.close(true);
          });
          break;
        default:
          break;
      }

    }
  }

}

interface DialogType {
  type: String,
  todo?: Todo
}
