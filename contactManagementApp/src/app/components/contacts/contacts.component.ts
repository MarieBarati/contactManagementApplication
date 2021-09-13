import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/contact';
import { ContactService } from '../../services/contacts.service';
import { NotificationService } from '../../services/notification.service';
import { debounce, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  @ViewChild('firstname') fName;
  @ViewChild('lastname') lName;
  searchSubject: Subject<string> = new Subject<string>();
  lastname: Subject<string> = new Subject<string>();
  page = 1;
  pageSize = GlobalConstants.pageSize;
  delay = GlobalConstants.delay;
  showModal = false;
  isSearched = false;
  content: any;
  viewcontactInfo: IContact;
  title: any;
  total: any;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private notifyservise: NotificationService,
  ) { }
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
        this.notifyservise.showError(error, 'Search Error');

      });

  }

  searchinput(event: any) {
    this.searchSubject.pipe(debounceTime(this.delay), distinctUntilChanged())
      .subscribe(c => {
        console.log(event);
        console.log('fname:', this.fName.nativeElement.value, 'lname:', this.lName.nativeElement.value);
        this.search(this.fName.nativeElement.value, this.lName.nativeElement.value);
      });

    this.searchSubject.next(event);
  }


  back() {
    this.Get(1);
    this.fName.nativeElement.value = '';
    this.lName.nativeElement.value = '';
  }
  Get(page: number) {
    if (page == 0) {
      page = 1;
    }
    this.contactService.getAllContact(page, this.pageSize).subscribe(data => {

      this.contacts = data.contactList;
      this.total = data.totalNumber;
      this.page = page;


    }, error => {
      this.notifyservise.showError(error, 'Get Contact Error');
    }
    );
  }

  view(id: string) {
    this.viewcontactInfo = this.contacts.find(c => c.id == id);
  }

  pageChanged(event) {

    this.Get(event);
  }

  Delete(id: string, page: number) {
    this.contactService.deleteContact(id).subscribe(res => {
      this.contacts = this.contacts.filter(item => item.id !== id);
      if (this.contacts.filter(item => item.id !== id).length == 0) {

        this.Get(page - 1);
      } else {
        this.Get(page);
      }

      this.notifyservise.showSuccess('Delete Succeccfull!', 'Delete');
    }, error => {
      this.notifyservise.showError(error, 'Delete Error');
    });
  }
}
