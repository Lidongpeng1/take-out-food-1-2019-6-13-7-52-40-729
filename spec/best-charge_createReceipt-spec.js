const { createReceipt } = require('../src/best-charge');

describe('createReceipt', function () {

  it('should return receipt when invoke createReceipt given itemIdsCountItemPrice and totalPriceSavingPromotion', function () {
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
    const totalPriceSavingPromotion = {
      totalPrice: 25.00,
      saving: 13,
      promotion: {
        type: '指定菜品半价',
        items: ['ITEM0001', 'ITEM0022']
      },
      promotionItems: [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00
      }, {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00
      }]
    };
    const result = createReceipt(itemIdsCountItemPrice, totalPriceSavingPromotion);
    expect(result).toEqual(
      `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`
    )
  });

  it('should return receipt when invoke createReceipt given itemIdsCountItemPrice and totalPriceSavingPromotion', function () {
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
    const totalPriceSavingPromotion = {
      totalPrice: 26.00,
      saving: 6,
      promotion: {
        type: '满30减6元'
      },
      promotionItems: []
    };
    const result = createReceipt(itemIdsCountItemPrice, totalPriceSavingPromotion);
    expect(result).toEqual(
      `============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`
    )
  });

  it('should return receipt when invoke createReceipt given itemIdsCountItemPrice and totalPriceSavingPromotion', function () {
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
    const totalPriceSavingPromotion = {
      totalPrice: 24.00,
      saving: 0,
      promotion: undefined,
      promotionItems: []
    };
    const result = createReceipt(itemIdsCountItemPrice, totalPriceSavingPromotion);
    expect(result).toEqual(
      `============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`
    )
  });

});