import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.residentId = null;
    this.resident = undefined;
    this.editForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      firstname: this.fb.control('', Validators.required),
      surname: this.fb.control(''),
      gender: this.fb.control(''),
      address: this.fb.control(''),
      quote: this.fb.control(''),
    });
  }

  ngOnInit(): void {
    this.residentId = this.getResidentId();

    if (this.residentId)
      this.apiService.getById(this.residentId).subscribe((resident) => {
        this.resident = resident;
        this.initForm(resident);
      });
  }

  private getResidentId(): number | null {
    const id = this.route.snapshot.paramMap.get('id');

    return id ? parseInt(id) : null;
  }

  initForm(resident: Resident) {
    const { username, firstname, surname, gender, address, quote } = resident;

    this.editForm.reset({
      username,
      firstname,
      surname,
      gender,
      address,
      quote,
    });
  }
}
