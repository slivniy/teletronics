import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TickerService } from '../../core/services/ticker-service/ticker.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectAssetDialogComponent } from '../select-asset-dialog/select-asset-dialog.component';

@Component({
  selector: 'app-ticker-header-selector',
  templateUrl: './ticker-header-selector.component.html',
  styleUrls: ['./ticker-header-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerHeaderSelectorComponent implements OnInit {

  constructor(
    private tickerService: TickerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tickerService.getAllAssetsList();
  }

  openModal(): void {
    this.dialog.open(SelectAssetDialogComponent, {
      width: '800px'
    }).afterClosed().subscribe(result => {
      if ( result ) {
        this.tickerService.addAssetsToSelected(result)
      }
    });
  }
}
