import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/contact';
import { ContactService } from '../../services/contacts.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls:['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  @ViewChild('firstname') fName;
  @ViewChild('lastname') lName; 
  page: number = 1;
  pageSize: number = 4;
  showModal: boolean = false;
  isSearched: boolean = false;
  content: any;
  viewcontactInfo: IContact;
  title: any;
    total: any;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private notifyservise: NotificationService,
  )
  {}
  ngOnInit() {
    this.Get(this.page);
  }
  search(firstname: string, lastname: string) {
    this.isSearched = true;
    this.contactService.search(firstname, lastname, 50, this.page).subscribe(data => {
      this.contacts = data.contactList;
      this.total = data.totalNumber;
    },

      error => {
        this.notifyservise.showError(error,"Search Error");

      });

  }
  back() {
    this.Get(1);
    this.fName.nativeElement.value = '';
    this.lName.nativeElement.value = '';
  }
  Get(page: number) {
    this.contactService.getAllContact(page,this.pageSize).subscribe(data => {
      this.contacts = data.contactList;
      this.total = data.totalNumber;
      this.page = page;
    }, error => {
      this.notifyservise.showError(error,"Get Contact Error");
      }
    );
  }

  view(id: string) {
    this.viewcontactInfo = this.contacts.find(c =>  c.id == id );
  }

  pageChanged(event) {
    console.log(event);
    this.Get(event);
  }
 
Delete(id: string){
  this.contactService.deleteContact(id).subscribe(res => {
    this.contacts = this.contacts.filter(item => item.id !== id);
    this.notifyservise.showSuccess("Delete Succeccfull!","Delete");
  }, error => {
    this.notifyservise.showError(error, "Delete Error");
  })
}
}


