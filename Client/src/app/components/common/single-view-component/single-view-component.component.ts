import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogType } from '../dialog/dialog.component';
import { User } from '../../user/user.component';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-single-view-component',
  templateUrl: './single-view-component.component.html',
  styleUrls: ['./single-view-component.component.css']
})
export class SingleViewComponentComponent implements OnInit {
  public user?: User;
  public usageCount: number = 0;
  public lastUpdated: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogType,
    public dialogRef: MatDialogRef<SingleViewComponentComponent>,
    private api: ApiService
  ) { }

  ngOnInit() {
    if (this.data.user) {
      this.user = this.data.user;
      this.getUsageCount(this.user!.id);
    }
  }

  getUsageCount(userId: string | undefined): void {
    this.api.getUserUsage(userId).subscribe(res => {
      console.log(res);
      this.usageCount = res.translateBtnCount;
      this.lastUpdated = res.updatedAt;
    });
  }

}
