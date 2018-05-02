import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NguiInviewModule, NguiListModule, NguiUtilsModule } from '../../modules';

import { AppComponent } from './app.component';
import { InviewComponent, InviewDirectiveTestComponent } from './inview-module-test';
import { AutocompleteComponent, InviewPageComponent, ListComponent, VirtualListComponent } from './list-module-test';

import {
  DynamicComponentServiceTestComponent,
  FireEventTestComponent,
  MyDynamicComponent,
  NguiHighlightPipeTestComponent
} from './utils-module-test';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
    RouterModule.forRoot(
      [
        { path: 'inview/ngui-inview', component: InviewComponent },
        { path: 'inview/nguiInview', component: InviewDirectiveTestComponent },
        { path: 'list/ngui-inview-page', component: InviewPageComponent },
        { path: 'list/ngui-list', component: ListComponent },
        { path: 'list/ngui-virtual-list', component: VirtualListComponent },
        { path: 'list/ngui-autocomplete', component: AutocompleteComponent },
        { path: 'utils/dynamic-component-service', component: DynamicComponentServiceTestComponent },
        { path: 'utils/ngui-highlight', component: NguiHighlightPipeTestComponent },
        { path: 'utils/fire-event', component: FireEventTestComponent },
        { path: '', redirectTo: '/inview/ngui-inview', pathMatch: 'full'}
      ] // , { enableTracing: true } // debugging purposes only
    )
  ],
  declarations: [
    AppComponent,
    InviewComponent,
    InviewDirectiveTestComponent,
    InviewPageComponent,
    ListComponent,
    VirtualListComponent,
    AutocompleteComponent,
    MyDynamicComponent,
    DynamicComponentServiceTestComponent,
    NguiHighlightPipeTestComponent,
    FireEventTestComponent
  ],
  providers: [],
  entryComponents: [MyDynamicComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
