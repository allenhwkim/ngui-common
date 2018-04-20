import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NguiInviewModule, NguiListModule, NguiUtilsModule } from '../../modules';

import { AppComponent } from './app.component';
import { InviewComponent, InviewDirectiveTestComponent } from './inview-module-test';
import { DynPageComponent, ListComponent } from './list-module-test';

@NgModule({
  declarations: [
    AppComponent,
    InviewComponent,
    InviewDirective,
    DynPageComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
    RouterModule.forRoot(
      [
        { path: 'inview/ngui-inview', component: InviewComponent },
        { path: 'inview/nguiInview', component: InviewDirectiveTestComponent },
        { path: 'list/ngui-dyn-page', component: DynPageComponent },
        { path: 'list/ngui-list', component: ListComponent },
        { path: '', redirectTo: '/inview/ngui-inview', pathMatch: 'full'}
      ] // , { enableTracing: true } // debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
