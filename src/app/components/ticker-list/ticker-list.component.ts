import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket-service/websocket.service';
import { TickerService } from '../../core/services/ticker-service/ticker.service';
import { Observable } from 'rxjs';
import { AssetInterface } from '../../core/interfaces/asset.interface';

@Component({
  selector: 'app-ticker-list',
  templateUrl: './ticker-list.component.html',
  styleUrls: ['./ticker-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerListComponent implements OnInit {

  selectedAssets$: Observable<AssetInterface[]>;

  constructor(
    private websocketService: WebsocketService,
    private tickerService: TickerService
  ) { }

  ngOnInit(): void {
    this.selectedAssets$ = this.websocketService.assetsListStream;
  }

  trackBy(index: number, item: AssetInterface): string {
    return item.id;
  }

  removeAsset(id: string): void {
    this.tickerService.removeAssetFromSelected(id);
  }
}
