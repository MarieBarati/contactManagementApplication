import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from 'src/app/components/contacts/contacts.component';
import { UpdateComponent } from 'src/app/components/update/update.component';
import { CreateComponent } from 'src/app/components/create/create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    UpdateComponent,
    CreateComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
