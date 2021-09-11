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
import { MaterialModule } from '../shared/modules/material/material.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ContactService } from './services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alter.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: true,
};
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
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfig),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  ],
  providers: [
    ContactService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
