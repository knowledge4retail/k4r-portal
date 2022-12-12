import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { HeaderComponent } from './header/header.component';
import { HealthIndicatorComponent } from './health-indicator/health-indicator.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceCardsFilterComponent } from './service-cards-filter/service-cards-filter.component';
import { ServiceCardsComponent } from './service-cards/service-cards.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SimpleMapComponent } from './simple-map/simple-map.component';

@NgModule({
  declarations: [
    ServiceCardsComponent,
    SidemenuComponent,
    HeaderComponent,
    HealthIndicatorComponent,
    ServiceCardsFilterComponent,
    SimpleMapComponent,
    DetailInfoComponent,
    ServiceCardComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatGridListModule,
    MatListModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  exports: [
    ServiceCardsComponent,
    SidemenuComponent,
    HeaderComponent,
    ServiceCardsFilterComponent,
    SimpleMapComponent,
    DetailInfoComponent,
    NotificationsComponent,
  ],
})
export class SharedModule {}
