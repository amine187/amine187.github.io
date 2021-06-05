import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Resident } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css'],
})
export class ResidentEditComponent implements OnInit {
  residentId: number | null;
  resident: Resident | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.residentId = null;
    this.resident = undefined;
  }

  ngOnInit(): void {
    this.residentId = this.getResidentId();

    if (this.residentId)
      this.apiService
        .getById(this.residentId)
        .subscribe((resident) => (this.resident = resident));
  }

  private getResidentId(): number | null {
    const id = this.route.snapshot.paramMap.get('id');

    return id ? parseInt(id) : null;
  }
}
