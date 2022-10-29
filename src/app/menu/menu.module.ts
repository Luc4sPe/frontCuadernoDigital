import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import {SlideMenuModule} from 'primeng/slidemenu';
import {MegaMenuModule} from 'primeng/megamenu';
import {DockModule} from 'primeng/dock';
import {ToastModule} from 'primeng/toast';

import {AvatarModule} from 'primeng/avatar';
import {MenubarModule} from 'primeng/menubar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SpeedDialModule} from 'primeng/speeddial';
import {ButtonModule} from 'primeng/button';





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
        AvatarModule,
        MenubarModule,
        SplitButtonModule,
        SpeedDialModule,
        ButtonModule
        
        
        
    ],
    exports: [
        MenuComponent
        
    
    ]
})

export class MenuModule {
}
