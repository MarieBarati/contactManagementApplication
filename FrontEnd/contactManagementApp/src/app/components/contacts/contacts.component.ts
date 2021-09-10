import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IContact } from '../../models/contact';
import { ContactService } from '../../services/contacts.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls:['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: IContact[] = [
    {
      id: 1, firstName: "Ram", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    },
    {
      id: 2, firstName: "John", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    },
    {
      id: 3, firstName: "Franc", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444 },
    {
      id: 4, firstName: "Andrew ", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    },
    {
      id: 5, firstName: "Linda", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    },
    {
      id: 6, firstName: "Akbar", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    },
    {
      id: 7, firstName: "Feri", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    },
    {
      id: 8, firstName: "Mary ", lastName: "Barati",
      homePhoneNumber: 6048613345, businessPhoneNumber: 6048613346,
      email: "Ram@gmail.com", mobilePhoneNumber: 6048634444
    }
  ];
  page = 1;

  constructor(
   // private contactService: ContactService,
    private router: Router,
    
  )
  {}
  ngOnInit() {
 //   this.contactService.getAllContact("127.1.1.1");
  }

  handlePageChange(event) {
    this.page = event;
  }


  }


