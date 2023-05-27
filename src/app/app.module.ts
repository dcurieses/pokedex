import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ApiRestService } from './shared/controller/api.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPokemonPipe } from './shared/filter-pokemon.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ListPokemonComponent, FilterPokemonPipe],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  providers: [ApiRestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
