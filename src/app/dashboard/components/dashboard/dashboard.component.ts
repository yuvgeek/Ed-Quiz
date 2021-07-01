import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  loading: boolean = true;

  stats$ = new Observable<any>();
  ngOnInit(): void {
    this.stats$ = this.dashboardService.refreshStats$
      .pipe(
        switchMap(() =>
          combineLatest([
            this.dashboardService.getStudentsCount(
              this.authService.userDetails.uid
            ),
            this.dashboardService.getStandardsCount(
              this.authService.userDetails.uid
            ),
            this.dashboardService.getQuizCount(
              this.authService.userDetails.uid
            ),
          ])
        )
      )
      .pipe(
        map(([studentsCount, standardsCount, quizCount]) => ({
          studentsCount,
          standardsCount,
          quizCount,
        })),
        tap(() => (this.loading = false))
      );
  }

  navigateTo(section: string) {
    this.router.navigate([section], { relativeTo: this.activatedRoute });
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard/students']);
  }
}
