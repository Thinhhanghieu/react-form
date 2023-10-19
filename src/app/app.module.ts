import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InputAppComponent } from './input-app/input-app.component';
import { ButtonAppComponent } from './button-app/button-app.component';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';
@NgModule({
  declarations: [
    AppComponent,
    InputAppComponent,
    ButtonAppComponent,
    SignInRfComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
