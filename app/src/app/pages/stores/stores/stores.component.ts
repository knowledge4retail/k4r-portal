import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { filter, Observable } from 'rxjs';
import { AppFacade } from 'src/app/+state/app.facade';
import { K4RStore } from 'src/app/apis/portal/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class StoresComponent implements OnInit {
  searchTerm: string = '';
  dataSource: MatTableDataSource<K4RStore> | undefined;
  expandedElement: K4RStore | undefined;
  displayedColumns: string[] = [
    'expand',
    'storeNumber',
    'storeName',
    'addressStreet',
    'addressPostcode',
    'addressCity',
    'addressState',
    'addressCountry',
    'shelfCount',
    'productCount',
    'storeviz',
  ];
  stores$: Observable<K4RStore[]> | undefined;
  env = environment;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;

  @ViewChild(MatSort)
  sort: MatSort | undefined;

  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.appFacade.loadStores();
    this.stores$ = this.appFacade.stores$;

    this.appFacade.stores$
      .pipe(filter((stores: K4RStore[]) => stores.length > 0))
      .subscribe((stores: K4RStore[]) => {
        this.dataSource = new MatTableDataSource(stores);
        this.dataSource.paginator = this.paginator!;
        this.dataSource.sort = this.sort!;
      });
  }

  applyFilter() {
    if (this.dataSource) {
      this.dataSource.filter = this.searchTerm.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onSelectedTabChange(e: MatTabChangeEvent) {
    this.expandedElement = undefined;
    if (e.index === 0 && this.dataSource) {
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    }
  }
}
