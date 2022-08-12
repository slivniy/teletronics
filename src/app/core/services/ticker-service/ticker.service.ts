import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetApiResponseInterface, AssetInterface } from '../../interfaces/asset.interface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StorageEnum } from '../../enums/storage.enum';
import { CoincapListResponseInterface } from '../../interfaces/coincap-list-response.interface';
import { WebsocketService } from '../websocket-service/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  private allAssets: AssetInterface[] = [];
  private availableFilteredAssets$ = new BehaviorSubject<AssetInterface[]>([]);
  private userSelectedAssets: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private websocketService: WebsocketService
  ) {
  }

  get availableFilteredAssets(): Observable<AssetInterface[]> {
    return this.availableFilteredAssets$.asObservable();
  }

  getAllAssetsList(): void {
    const params = {params: {limit: 2000}};
    this.httpClient.get<CoincapListResponseInterface<AssetApiResponseInterface>>(`${environment.coinCapApi}/assets`, params).pipe(
      map(list => list.data.filter(a => a.id)),
      map(list => list.map(a => {
        const { id, name, symbol, priceUsd } = a;
        return { id, name, symbol, priceUsd };
      })),
      tap(list => this.allAssets = [...list]),
    ).subscribe(() => {
      this.sanitizeUserAssets();
      this.filterAvailableForSelectList();
      this.updateSocketConnection();
    });
  }

  private sanitizeUserAssets(): void {
    try {
      const savedList = JSON.parse(localStorage.getItem(StorageEnum.selectedAssets) || '');
      if ( savedList && Array.isArray(savedList) ) {
        this.userSelectedAssets = savedList.filter(el => {
          // check if all saved assets are available in CoinCap response
          return typeof el === 'string' && this.allAssets.some(a => a.id === el);
        });
      }
    } catch (e) {}
  }

  private filterAvailableForSelectList(): void {
    const filteredAssets = this.allAssets.filter(a => !this.userSelectedAssets.includes(a.id));
    filteredAssets.sort((a, b) => a.name.localeCompare(b.name))
    this.availableFilteredAssets$.next(filteredAssets);
  }

  private updateSocketConnection(): void {
    if ( this.userSelectedAssets.length ) {
      localStorage.setItem(StorageEnum.selectedAssets, JSON.stringify(this.userSelectedAssets));
      const list = this.allAssets.filter(a => this.userSelectedAssets.includes(a.id));
      this.websocketService.setSocketConnection( list );
    } else {
      localStorage.removeItem(StorageEnum.selectedAssets);
      this.websocketService.emitListUpdateWithLatestData([]);
      this.websocketService.closeSocketConnection();
    }
  }

  addAssetsToSelected(newIds: string[]): void {
    this.userSelectedAssets = this.userSelectedAssets.concat(newIds);
    this.filterAvailableForSelectList();
    this.updateSocketConnection();
  }

  removeAssetFromSelected(id: string): void {
    this.userSelectedAssets = this.userSelectedAssets.filter(a => a !== id );
    this.filterAvailableForSelectList();
    this.updateSocketConnection();
  }
}
