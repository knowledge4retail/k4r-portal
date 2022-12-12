import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { K4RComponent } from 'src/app/apis/portal/models/k-4-r-component';
import { K4RComponentType } from 'src/app/apis/portal/models/k-4-r-component-type';
import { Service } from 'src/app/models/Service';

@Injectable({
  providedIn: 'root',
})
export class ServiceCardsService {
  token: string = 'k4r_components_favorites';

  constructor(private snackBar: MatSnackBar) {}

  getFavoritesFromStorage(): string[] | undefined {
    const favorites: string | null = localStorage.getItem(this.token);
    const parsedFavorites: string[] | undefined = favorites
      ? JSON.parse(favorites)
      : undefined;

    return parsedFavorites;
  }

  addComponentsFavorite(name: string): void {
    const favorites: string[] | undefined = this.getFavoritesFromStorage();
    if (favorites && !favorites.includes(name)) {
      favorites.push(name);
      localStorage.setItem(this.token, JSON.stringify(favorites));
    } else {
      localStorage.setItem(this.token, JSON.stringify([name]));
    }
    this.snackBar.open('Favorite has been added on this device.', 'Dismiss', {
      duration: 3000,
    });
  }

  removeComponentsFavorites(name: string): void {
    const favorites: string[] | undefined = this.getFavoritesFromStorage();
    if (favorites) {
      localStorage.setItem(
        this.token,
        JSON.stringify(favorites.filter((f) => f !== name))
      );
      this.snackBar.open(
        'Favorite has been removed on this device.',
        'Dismiss',
        {
          duration: 3000,
        }
      );
    }
  }

  getComponentsFavorites(services: K4RComponent[]): Service[] {
    const favorites: string[] | undefined = this.getFavoritesFromStorage();

    return services.map((s) => ({
      ...s,
      health: null,
      iconName: this.getIconName(s.type),
      favorite: favorites ? favorites.includes(s.prettyName) : false,
    })) as unknown as Service[];
  }

  getIconName(type: K4RComponentType): string {
    switch (type) {
      case K4RComponentType.Api:
        return 'api';

      case K4RComponentType.Webui:
        return 'space_dashboard';

      case K4RComponentType.Administrative:
        return 'admin_panel_settings';
    }
  }
}
