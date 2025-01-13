import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class ResponsiveService implements OnDestroy {


  private isSmallScreenSubject = new BehaviorSubject<boolean>(false);
  private observer!: Subscription;


  isSmallScreen$ = this.isSmallScreenSubject.asObservable();
  isSmallScreen!: boolean

  constructor(private breakpointObserver: BreakpointObserver) {
    this.startBreakpointObserver();
  }

  private startBreakpointObserver() {
    this.observer = this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Handset, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isSmallScreenSubject.next(state.matches);
      });
  }

  screenListener(){
    this.observer = this.isSmallScreen$.subscribe(isSmall => {
      this.isSmallScreen = isSmall;
    });
  }

  ngOnDestroy() {
   this.unsubscribe()
  }

  unsubscribe(){
    if (this.observer) {
      this.observer.unsubscribe();
      console.log('unsubscribe')
    }
  }
}