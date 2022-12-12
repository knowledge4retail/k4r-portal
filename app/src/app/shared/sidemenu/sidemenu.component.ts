import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavItem } from 'src/app/models/NavItem';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {

  @Input()
  items: NavItem[] | undefined;

  @Output()
  itemClicked: EventEmitter<null> = new EventEmitter<null>();

  onClick(): void {
    this.itemClicked.emit();
  }
}
