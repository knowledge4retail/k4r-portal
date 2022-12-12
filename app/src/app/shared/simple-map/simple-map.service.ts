import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector
} from '@angular/core';
import * as L from 'leaflet';
import { K4RStore } from 'src/app/apis/portal/models';
import { DetailInfoComponent } from '../detail-info/detail-info.component';

@Injectable({
  providedIn: 'root',
})
export class SimpleMapService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  getMap(filteredStores: K4RStore[], showPopup: boolean): L.Map {
    const map = L.map('simple-map');

    const tiles: L.TileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    const featureGroup: L.FeatureGroup = L.featureGroup(
      filteredStores.map((store) =>
        showPopup
          ? this.getCircleMarker(store).bindPopup(this.getPopUpComponent(store))
          : this.getCircleMarker(store)
      )
    ).addTo(map);

    map.fitBounds(featureGroup.getBounds());

    return map;
  }

  getCircleMarker(store: K4RStore): L.CircleMarker {
    return L.circleMarker([+store.latitude! || 0, +store.longitude! || 0], {
      color: '#020228',
      fillColor: '#85ff00',
      fillOpacity: 0.5,
      radius: 5,
    });
  }

  hasValidLocation(store: K4RStore): boolean {
    return (
      !!store.latitude &&
      store.latitude !== '' &&
      store.latitude !== 'null' &&
      store.latitude !== '0.0' &&
      !!store.longitude &&
      store.longitude !== '' &&
      store.longitude !== 'null' &&
      store.longitude !== '0.0'
    );
  }

  getPopUpComponent(data: K4RStore): HTMLElement {
    const popup: HTMLElement = document.createElement('popup-component');
    const factory: ComponentFactory<DetailInfoComponent> =
      this.componentFactoryResolver.resolveComponentFactory(
        DetailInfoComponent
      );
    const popupComponentRef = factory.create(this.injector, [], popup);
    this.applicationRef.attachView(popupComponentRef.hostView);
    popupComponentRef.instance.data = data;
    return popup;
  }
}
