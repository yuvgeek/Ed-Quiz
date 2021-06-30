import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { StandardsService } from 'src/app/services/standards.service';
import { AddStandardComponent } from '../add-standard/add-standard.component';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.scss'],
})
export class StandardsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource$ = new Observable<any>();
  isLoading = true;
  refreshData$ = new BehaviorSubject<any>(true);

  addStandardDialog$: Observable<any> = new Observable<any>();

  constructor(
    public dialog: MatDialog,
    private standardsService: StandardsService
  ) {}

  ngOnInit(): void {
    this.getStandards();
  }

  getStandards() {
    this.dataSource$ = this.refreshData$.pipe(
      switchMap(() => this.standardsService.getStandards()),
      tap(() => (this.isLoading = false))
    );
  }

  addStandard() {
    this.dialog
      .open(AddStandardComponent)
      .afterClosed()
      .pipe(tap(() => (this.isLoading = true)))
      .subscribe(() => {
        this.refreshData$.next(new Date());
      });
  }

  deleteStandard(id: string) {
    this.standardsService.deleteStandard(id).subscribe(
      () => {
        this.refreshData$.next(new Date());
      },
      (err) => console.log(err)
    );
  }
}
