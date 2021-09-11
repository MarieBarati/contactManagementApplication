import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/services/alter.service';
import { ContactService } from 'src/app/services/contacts.service';

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
    private alertService: AlertService,
    
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z \-\']+')]),
      email: new FormControl('',  Validators.email),
      mobilePhoneNumber: new FormControl('', Validators.maxLength(10)),
      homePhoneNumber: new FormControl('',  Validators.maxLength(10)),
      businessPhoneNumber: new FormControl('', Validators.maxLength(10))
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
      this.alertService.clear();

    if (this.form.invalid) {
      console.log("invalidform");
          return;
      }
    this.loading = true;
          this.addContact();
      
  }

  private addContact() {
    
      this.contactservise.addContact(this.form.value)
          .pipe(first())
          .subscribe(() => {
              this.alertService.success('Contact added', { keepAfterRouteChange: true });
              this.router.navigate([''], { relativeTo: this.route });
          })
          .add(() => this.loading = false);
  }

}
