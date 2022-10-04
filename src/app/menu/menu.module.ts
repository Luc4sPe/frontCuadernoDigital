import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import {SlideMenuModule} from 'primeng/slidemenu';
import {MegaMenuModule} from 'primeng/megamenu';
import {DockModule} from 'primeng/dock';
import {ToastModule} from 'primeng/toast';

import {AvatarModule} from 'primeng/avatar';





@NgModule({
    declarations: [
        MenuComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule,
        SlideMenuModule,
        MegaMenuModule,
        DockModule,
        ToastModule,
        AvatarModule
        
        
        
    ],
    exports: [
        MenuComponent
        
    
    ]
})

export class MenuModule {
}
