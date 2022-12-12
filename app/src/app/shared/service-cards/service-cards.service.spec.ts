import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { K4RComponent } from 'src/app/apis/portal/models';
import { Service } from 'src/app/models/Service';

import { ServiceCardsService } from './service-cards.service';

describe('ServiceCardsService', () => {
  const matSnackBarMock = {
    open: () => true,
  } as unknown as MatSnackBar;

  let service: ServiceCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: matSnackBarMock }],
    });
    service = TestBed.inject(ServiceCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a token called k4r_components_favorites', () => {
    expect(service.token).toBe('k4r_components_favorites');
  });

  describe('getFavoritesFromStorage', () => {
    it('should return undefined if local storage is empty', () => {
      localStorage.removeItem('k4r_components_favorites');
      expect(service.getFavoritesFromStorage()).toBeUndefined();
    });

    it('should return an array of strings from the local storage', () => {
      const testArr: string[] = ['foo', 'bar'];
      spyOn(localStorage, 'getItem').and.returnValue(`["foo","bar"]`);
      localStorage.setItem('k4r_components_favorites', JSON.stringify(testArr));
      expect(service.getFavoritesFromStorage()).toEqual(testArr);
    });
  });

  describe('addComponentsFavorite', () => {
    it('should add a favorite in localstorage and open a snackbar', () => {
      spyOn(service, 'getFavoritesFromStorage').and.returnValue(['bar', 'baz']);
      localStorage.setItem = jasmine.createSpy();
      matSnackBarMock.open = jasmine.createSpy();
      service.addComponentsFavorite('foo');
      expect(localStorage.setItem).toHaveBeenCalledOnceWith(
        'k4r_components_favorites',
        `["bar","baz","foo"]`
      );
      expect(matSnackBarMock.open).toHaveBeenCalled();
    });
  });

  describe('removeComponentsFavorites', () => {
    it('should remove a favorite in localstorage and open a snackbar', () => {
      spyOn(service, 'getFavoritesFromStorage').and.returnValue(['foo', 'bar']);
      localStorage.setItem = jasmine.createSpy();
      matSnackBarMock.open = jasmine.createSpy();
      service.removeComponentsFavorites('foo');
      expect(localStorage.setItem).toHaveBeenCalledOnceWith(
        'k4r_components_favorites',
        `["bar"]`
      );
      expect(matSnackBarMock.open).toHaveBeenCalled();
    });
  });

  describe('getComponentsFavorites', () => {
    it('should remove a favorite in localstorage and open a snackbar', () => {
      spyOn(service, 'getFavoritesFromStorage').and.returnValue(['foo', 'bar']);
      const services = [
        { prettyName: 'foo' },
        { prettyName: 'baz' },
      ] as K4RComponent[];
      const expected: Service[] = [
        { prettyName: 'foo', health: null, favorite: true, iconName: undefined },
        { prettyName: 'baz', health: null, favorite: false, iconName: undefined },
      ] as unknown as Service[];
      expect(service.getComponentsFavorites(services)).toEqual(expected);
    });
  });
});