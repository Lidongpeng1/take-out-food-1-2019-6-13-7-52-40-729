const { calculateTotalPriceWithPromotion } = require('../src/best-charge');

describe('calculateTotalPriceWithPromotion', function () {

  it('should return totalPriceSaving when invoke calculateTotalPriceWithPromotion given itemIdsCountItemPrice', function () {
    const itemIdsCountItemPrice = [
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
    ];
    const promotion = {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    };
    const result = calculateTotalPriceWithPromotion(itemIdsCountItemPrice, promotion);
    expect(result).toEqual({
      totalPrice: 25.00,
      saving: 13,
      promotionItems: [
        { id: 'ITEM0001', name: '黄焖鸡', price: 18 },
        { id: 'ITEM0022', name: '凉皮', price: 8 }
      ],
    })
  });

  it('should return totalPriceSaving when invoke calculateTotalPriceWithPromotion given itemIdsCountItemPrice', function () {
    const itemIdsCountItemPrice = [
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
    ];
    const promotion = {
      type: '满30减6元'
    };
    const result = calculateTotalPriceWithPromotion(itemIdsCountItemPrice, promotion);
    expect(result).toEqual({
      totalPrice: 26.00,
      saving: 6,
      promotionItems: [],
    })
  });

  it('should return totalPriceSaving when invoke calculateTotalPriceWithPromotion given itemIdsCountItemPrice', function () {
    const itemIdsCountItemPrice = [
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
    ];
    const promotion = {
      type: '满30减6元'
    };
    const result = calculateTotalPriceWithPromotion(itemIdsCountItemPrice, promotion);
    expect(result).toEqual({
      totalPrice: 24.00,
      saving: 0,
      promotionItems: [],
    })
  });

});