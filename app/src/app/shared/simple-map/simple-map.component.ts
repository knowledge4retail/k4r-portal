import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { K4RStore } from 'src/app/apis/portal/models';
import { SimpleMapService } from './simple-map.service';

@Component({
  selector: 'app-simple-map',
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.scss'],
})
export class SimpleMapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: L.Map | undefined;
  filteredStores: K4RStore[] | undefined;

  @Input()
  data!: K4RStore[];

  @Input()
  showPopup = true;

  constructor(private simpleMapService: SimpleMapService) {}

  ngOnInit(): void {
    this.filteredStores = this.data.filter((store) =>
      this.simpleMapService.hasValidLocation(store)
    );
  }

  ngAfterViewInit(): void {
    if (this.filteredStores && this.filteredStores.length > 0) {
      // workaround if there is more than one map on a page
      setTimeout(() => {
        this.map = this.simpleMapService.getMap(this.filteredStores!, this.showPopup)
      }, 100)
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map = this.map.off();
      this.map = this.map.remove();
    }
  }
}
