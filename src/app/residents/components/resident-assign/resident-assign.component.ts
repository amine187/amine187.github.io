import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Unsubscribe } from 'redux';
import { Resident, ResidentsStore } from 'src/app/core/models';

@Component({
  selector: 'app-resident-assign',
  templateUrl: './resident-assign.component.html',
  styleUrls: ['./resident-assign.component.css'],
})
export class ResidentAssignComponent implements OnInit, OnDestroy {
  public assignCtrl: FormControl;
  public residents: Resident[];

  private unsubscribeStore: Unsubscribe;

  @Input()
  assigneeID: number | null;

  constructor(
    @Inject('ResidentsStore') private residentsStore: ResidentsStore
  ) {
    this.assigneeID = null;
    this.assignCtrl = new FormControl('');
    this.residents = [];
    this.unsubscribeStore = () => {};
  }

  ngOnInit(): void {
    this.unsubscribeStore = this.residentsStore.subscribe(() => {
      this.residents = this.residentsStore
        .getState()
        .filter(({ id }) => id !== this.assigneeID);
    });
  }

  loadResidents() {
    this.residentsStore.dispatch({ type: null });
  }

  ngOnDestroy() {
    this.unsubscribeStore();
  }
}
