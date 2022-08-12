import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AssetInterface } from '../../core/interfaces/asset.interface';
import { TickerService } from '../../core/services/ticker-service/ticker.service';

@Component({
  selector: 'app-select-asset-dialog',
  templateUrl: './select-asset-dialog.component.html',
  styleUrls: ['./select-asset-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAssetDialogComponent implements OnInit {

  availableAssets$: Observable<AssetInterface[]>;
  assetFilter: string;
  selectedAssets = new Set<string>();

  constructor(
    private tickerService: TickerService,
    public dialogRef: MatDialogRef<SelectAssetDialogComponent>,
  ) {}

  ngOnInit() {
    this.availableAssets$ = this.tickerService.availableFilteredAssets;
  }

  onSave(): void {
    this.dialogRef.close([...this.selectedAssets]);
  }

  onSelect(checked: boolean, id: string): void {
    if (checked) {
      this.selectedAssets.add(id);
    } else {
      this.selectedAssets.delete(id);
    }
  }
}
