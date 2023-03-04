import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../../services/api.service';
import { Todo } from '../../todo/todo.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogType,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {

    if(this.data.type === "todo"){
      this.form = this.formBuilder.group({
        title: ["", [Validators.nullValidator, Validators.required]],
        isDone: ["", [Validators.nullValidator, Validators.required]],
        description: ["",[Validators.nullValidator, Validators.required]],
        createdAt: ["",[Validators.nullValidator, Validators.required]]
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
    console.log(this.form.value);
    if(this.form.valid && this.data.type === "todo"){
      
      const toDoformData: Todo = {
        title: this.form.value.title,
        description: this.form.value.description,
        isDone: this.form.value.isDone === '1' ? true : false,
        createdAt: this.form.value.createdAt,
        userId: localStorage.getItem('userId')!,
      }

      this.api.createTodo(toDoformData).subscribe((res) => {
        this.router.navigate(["todos"]);
        this.dialogRef.close();
      });

    }

  }
}

interface DialogType {
  type: String
}
