import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import {SlideMenuModule} from 'primeng/slidemenu';


@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SlideMenuModule
        
        
    ],
    exports: [
        MenuComponent,
        
    
    ]
})

export class MenuModule {
}
