import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contacts.service';
import { AlertService } from '../../services/alter.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit
{
  form: FormGroup;
  id!: string;
  submitted = false;
  loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactservice: ContactService,
    private alterservice: AlertService
  ) { this.id = this.activatedRoute.snapshot.params.id;}
  
  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z \-\']+')]),
      email: new FormControl('', Validators.email),
      mobilePhoneNumber: new FormControl('', Validators.maxLength(10)),
      homePhoneNumber: new FormControl('', Validators.maxLength(10)),
      businessPhoneNumber: new FormControl('', Validators.maxLength(10))
    });

    this.getContact();
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

  getContact() {
    // this.spinner.show();
    this.contactservice.getById(this.id).subscribe(
      res => {
       // this.spinner.hide();
        // this.toastrService.success('استعلام اطلاعات با موفقیت انجام شد');
        console.log(res);
        this.form.patchValue(
          {
            'firstName': res.firstName,
            'lastName': res.lastName,
            'businessPhoneNumber': res.businessPhoneNumber,
            'homePhoneNumber': res.homePhoneNumber,
            'mobilePhoneNumber': res.businessPhoneNumber,
            'email': res.email
         
          })
       
      },
      error => {
        console.log(error);
        //this.spinner.show();
      })
  }
  onSubmit() {
    this.submitted = true;
    this.alterservice.clear();

    if (this.form.invalid) {
      console.log("invalidform");
      return;
    }
    this.loading = true;
    this.update();

  }
  update() {

    this.contactservice.updateContact(this.id, this.form.value).subscribe(res => {
      console.log("dddd");
    }
    );
  }
}
