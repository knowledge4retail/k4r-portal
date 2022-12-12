import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard';

@NgModule({
  declarations: [],
  providers: [AuthGuard],
  imports: [CommonModule],
  exports: [],
})
export class AuthModule {}
