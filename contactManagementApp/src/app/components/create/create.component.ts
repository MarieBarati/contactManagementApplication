import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts.service';
import { first } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import {GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactservise: ContactService,
    private notifyService: NotificationService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(GlobalConstants.firstNameLength), Validators.pattern(GlobalConstants.firstNamePattern)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(GlobalConstants.lastNameLength), Validators.pattern(GlobalConstants.lastNamePattern)]),
      email: new FormControl('', Validators.email),
      mobilePhoneNumber: new FormControl('', Validators.maxLength(GlobalConstants.phoneNumberLength)),
      homePhoneNumber: new FormControl('', Validators.maxLength(GlobalConstants.phoneNumberLength)),
      businessPhoneNumber: new FormControl('', Validators.maxLength(GlobalConstants.phoneNumberLength))
    });
  }

  get firstName() {

    return this.form.get('firstName') as FormControl;
  }
  get lastName() {
    return this.form.get('lastName') as FormControl;
  }
  get mobilePhoneNumber() {
    return this.form.get('mobilePhoneNumber') as FormControl;
  }
  get homePhoneNumber() {
    return this.form.get('homePhoneNumber') as FormControl;
  }
  get businessPhoneNumber() {
    return this.form.get('businessPhoneNumber') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log('invalidform');
      return;
    }
    this.loading = true;
    this.addContact();

  }

  private addContact() {

    this.contactservise.addContact(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.notifyService.showSuccess('Contact added', 'add');
        this.submitted = false;
        this.form.reset();
      },
        error => {
          this.notifyService.showError(error, 'Add Contact Error');
        })
      .add(() => this.loading = false);
  }

}
