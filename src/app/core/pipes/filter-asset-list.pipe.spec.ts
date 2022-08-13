import { FilterAssetListPipe } from './filter-asset-list.pipe';

describe('FilterAssetListPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterAssetListPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty list if async pipe returns undefined', () => {
    const pipe = new FilterAssetListPipe();
    // @ts-ignore
    expect(pipe.transform(undefined, '')).toEqual([]);
  });

  it('should return same list if no filter', () => {
    const pipe = new FilterAssetListPipe();
    // @ts-ignore
    expect(pipe.transform([], '')).toEqual([]);
  });

  it('should return filtered list', () => {
    const asset1 = { id: 'id1', name: 'Bitcoin', priceUsd: '1', symbol: 'BTC' };
    const asset2 = { id: 'id2', name: 'Cardano', priceUsd: '1', symbol: 'ADA' };
    const initialList = [ asset1, asset2 ];
    const pipe = new FilterAssetListPipe();
    // @ts-ignore
    expect(pipe.transform(initialList, 'btc')).toEqual([asset1]);
  });

});
