import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Todo } from '../../todo/todo.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private formBuilder: FormBuilder,
  ) {}

  OnInit() {
    this.form = this.formBuilder.group({
      title: ["", [Validators.nullValidator, Validators.required]],
      isDone: ["", [Validators.nullValidator, Validators.required]],
      description: ["",[Validators.nullValidator, Validators.required]],
      date: ["",[Validators.nullValidator, Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  action() {
    console.log(localStorage.getItem("userId"));
  }
}
