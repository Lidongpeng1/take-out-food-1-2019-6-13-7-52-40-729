const { conbineItem } = require('../src/best-charge');
const { loadAllItems } = require('../src/items');

describe('conbine itemIdCount to item', function () {

  it('should return itemIdsCountItem array when invoke conbineItem given itemIdsCount and allItems', function () {
    const itemIdsCount = [
      { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 },
    ];
    const allItems = loadAllItems();
    const result = conbineItem(itemIdsCount, allItems);
    expect(result).toEqual([
      {
        id: 'ITEM0001',
        count: 1,
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        }
      },
      {
        id: 'ITEM0013',
        count: 2,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        }
      },
      {
        id: 'ITEM0022',
        count: 1,
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        }
      },
    ])
  });

  it('should return itemIdsCountItem array when invoke conbineItem given itemIdsCount and allItems', function () {
    const itemIdsCount = [
      { id: 'ITEM0013', count: 4, },
      { id: 'ITEM0022', count: 1, },
    ];
    const allItems = loadAllItems();
    const result = conbineItem(itemIdsCount, allItems);
    expect(result).toEqual([
      {
        id: 'ITEM0013',
        count: 4,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        }
      },
      {
        id: 'ITEM0022',
        count: 1,
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        }
      },
    ])
  });

  it('should return itemIdsCountItem array when invoke conbineItem given itemIdsCount and allItems', function () {
    const itemIdsCount = [
      { id: 'ITEM0013', count: 4, },
    ];
    const allItems = loadAllItems();
    const result = conbineItem(itemIdsCount, allItems);
    expect(result).toEqual([
      {
        id: 'ITEM0013',
        count: 4,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        }
      },
    ])
  });

});