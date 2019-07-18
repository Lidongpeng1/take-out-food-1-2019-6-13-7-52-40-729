const { calculateItemsPrice } = require('../src/best-charge');

describe('calculate items price', function () {

  it('should return itemIdsCountItemPrice when invoke calculateItemsPrice given itemIdsCountItem', function () {
    const itemIdsCountItem = [
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
    ];
    const result = calculateItemsPrice(itemIdsCountItem);
    expect(result).toEqual([
      {
        id: 'ITEM0001',
        count: 1,
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        itemPrice: 18.00
      },
      {
        id: 'ITEM0013',
        count: 2,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        itemPrice: 12.00
      },
      {
        id: 'ITEM0022',
        count: 1,
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        itemPrice: 8.00
      },
    ])
  });

  it('should return itemIdsCountItemPrice when invoke calculateItemsPrice given itemIdsCountItem', function () {
    const itemIdsCountItem = [
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
    ];
    const result = calculateItemsPrice(itemIdsCountItem);
    expect(result).toEqual([
      {
        id: 'ITEM0013',
        count: 4,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        itemPrice: 24.00
      },
      {
        id: 'ITEM0022',
        count: 1,
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        itemPrice: 8.00
      },
    ])
  });

  it('should return itemIdsCountItemPrice when invoke calculateItemsPrice given itemIdsCountItem', function () {
    const itemIdsCountItem = [
      {
        id: 'ITEM0013',
        count: 4,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        }
      },
    ];
    const result = calculateItemsPrice(itemIdsCountItem);
    expect(result).toEqual([
      {
        id: 'ITEM0013',
        count: 4,
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        itemPrice: 24.00
      },
    ])
  });

});