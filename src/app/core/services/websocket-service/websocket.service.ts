import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AssetInterface } from '../../interfaces/asset.interface';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: WebSocketSubject<{[key: string]: string}>;
  private assetsList$ = new BehaviorSubject<AssetInterface[]>([]);

  setSocketConnection(assets: AssetInterface[]): void {

    this.closeSocketConnection();
    // emit list with new array (and update UI) to avoid wait for Sockets reconnection
    this.emitListUpdateWithLatestData(assets);
    const assetParameter = assets.map(a => a.id).toString();

    this.socket = webSocket<{[key: string]: string}>({
      url: `${environment.coinCapWebSocketsUrl}prices?assets=${assetParameter}`,
      openObserver: {
        next: e => {
          if ( !environment.production ) {
            console.log('on openObserver', e);
          }
        }
      },
      closeObserver: {
        next: e => {
          if ( !environment.production ) {
            console.warn('closeObserver', e);
          }
        }
      }
    })

    this.socket.subscribe(r => {
      const updatedPrices = assets.map(a => {
        return {
          ...a,
          // message can contain 1 or more asset (not always all), that was subscribed in a channel
          priceUsd: r[a.id] || a.priceUsd
        }
      });
      this.assetsList$.next(updatedPrices);
    });
  }

  emitListUpdateWithLatestData(requestList: AssetInterface[]): void {
    const filtered = requestList.map(newAsset => {
      const prevAsset = this.assetsList$.value.find(a => a.id === newAsset.id);
      return prevAsset || newAsset;
    })
    this.assetsList$.next(filtered);
  }

  get assetsListStream(): Observable<AssetInterface[]> {
    return this.assetsList$.asObservable();
  }


  closeSocketConnection(): void {
    this.socket?.complete();
  }
}
