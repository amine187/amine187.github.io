import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { takeUntil } from 'rxjs/operators';

import { ResidentsActions } from '../../store';
import { Resident, ResidentsStore } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.css'],
})
export class ResidentListComponent implements OnInit, OnDestroy {
  residents$: Resident[] = [];

  private unsubscribeStore: Unsubscribe = () => {};
  private unsubscribeAll: Subject<boolean> = new Subject();

  constructor(
    @Inject('ResidentsStore') private residentsStore: ResidentsStore,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.unsubscribeStore = this.residentsStore.subscribe(() => {
      this.residents$ = this.residentsStore.getState();
    });

    this.loadResidents();
  }

  loadResidents() {
    this.apiService.fetchAll().pipe(takeUntil(this.unsubscribeAll)).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribeStore();
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
