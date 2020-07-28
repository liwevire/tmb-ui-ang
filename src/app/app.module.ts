import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AngMatModule } from './Material/ang-mat.module';
import { AppComponent } from './app.component';
import { EditItemComponent } from './loans/items/edit-item/edit-item.component';
import { EditActivityComponent } from './loans/activities/edit-activity/edit-activity.component';
import { CustomCalendarHeaderComponent } from './shared/custom-calendar-header/custom-calendar-header.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EditItemComponent,
    EditActivityComponent,
    CustomCalendarHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngMatModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
