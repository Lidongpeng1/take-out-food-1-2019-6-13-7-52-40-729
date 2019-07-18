const { convertSelectedItemToItemIdCount } = require('../src/best-charge');

describe('convert selectedItem to itemIdCount', function () {

  it('should return itemIdsCount array when invoke convertSelectedItemToItemIdCount given a selectedItems', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let itemIdsCount = convertSelectedItemToItemIdCount(inputs);
    expect(itemIdsCount).toEqual([
      { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 },
    ])
  });

  it('should return itemIdsCount array when invoke convertSelectedItemToItemIdCount given a selectedItems', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let itemIdsCount = convertSelectedItemToItemIdCount(inputs);
    expect(itemIdsCount).toEqual([
      { id: 'ITEM0013', count: 4 },
      { id: 'ITEM0022', count: 1 },
    ])
  });

  it('should return itemIdsCount array when invoke convertSelectedItemToItemIdCount given a selectedItems', function () {
    let inputs = ["ITEM0013 x 4"];
    let itemIdsCount = convertSelectedItemToItemIdCount(inputs);
    expect(itemIdsCount).toEqual([
      { id: 'ITEM0013', count: 4 },
    ])
  });

});