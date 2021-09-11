import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IContact } from 'src/app/models/contact';
import { ContactService } from '../../services/contacts.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls:['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts :any[] =[];
  page = 1;
  showModal: boolean = false;
  content: any;
  title: any;
  constructor(
    private contactService: ContactService,
    private router: Router,
    
  )
  {}
  ngOnInit() {
    this.Get();
  
  }
  Get(){
    this.contactService.getAllContact().subscribe(data =>{
      this.contacts = data;
      console.log(this.contacts);
    })  

  }
  show(id) {
    this.showModal = true; // Show-Hide Modal Check
    this.content = "Welcome to phpcodingstuff.com we learn Open Bootstrap Modal Popup With Dynamic Content  "; // Dynamic Data
    this.title = id;    // Dynamic Data
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
Delete(id: string){
  this.contactService.deleteContact(id).subscribe(res => {
    this.contacts = this.contacts.filter(item => item.id !== id);
    console.log(' deleted successfully!');
})
}
}


