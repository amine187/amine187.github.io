import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ResidentsStore } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services';
import { ResidentsActions } from '../../store';

@Component({
  selector: 'app-resident-filter',
  templateUrl: './resident-filter.component.html',
  styleUrls: ['./resident-filter.component.css'],
})
export class ResidentFilterComponent implements OnInit, OnDestroy {
  public filterCtrl: FormControl;
  public filterForm: FormGroup;

  private unsubscribeAll: Subject<boolean>;

  constructor(
    @Inject('ResidentsStore') private residentsStore: ResidentsStore,
    private residentsActions: ResidentsActions,
    private apiService: ApiService
  ) {
    this.unsubscribeAll = new Subject();
    this.filterCtrl = new FormControl('');
    this.filterForm = new FormGroup({
      filterCtrl: this.filterCtrl,
    });
  }

  ngOnInit(): void {
    this.filterCtrl.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((value) => this.applyFilter(value));
  }

  applyFilter(value: string): void {
    if (value) {
      this.residentsStore.dispatch(
        this.residentsActions.residentsFiltered(value)
      );
    } else {
      this.loadResidents();
    }
  }

  loadResidents() {
    this.apiService.fetchAll().pipe(takeUntil(this.unsubscribeAll)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
