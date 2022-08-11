import { Pipe, PipeTransform } from '@angular/core';
import { AssetInterface } from '../interfaces/asset.interface';

@Pipe({
  name: 'filterAssetList'
})
export class FilterAssetListPipe implements PipeTransform {

  transform(list: AssetInterface[], filter: string): AssetInterface[] {
    if (!list) {
      return [];
    }
    if ( filter ) {
      return list.filter(a => ~(a.name + a.symbol).toLowerCase().indexOf(filter.toLowerCase()));
    } else {
      return list;
    }
  }

}
