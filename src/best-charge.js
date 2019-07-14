const { loadAllItems } = require('./items')
const { loadPromotions } = require('./promotions')

function convertSelectedItemToItemIdCount(selectedItems) {
  return selectedItems.map((selectedItem) => {
    const [id, countString] = selectedItem.split(' x ');
    return {
      id: id,
      count: Number(countString),
    };
  });
}

function conbineItem(itemIdsCount, allItems) {
  const result = [];
  for (const itemIdCount of itemIdsCount) {
    for (const item of allItems) {
      if (itemIdCount.id === item.id) {
        itemIdCount.item = item;
        result.push(itemIdCount);
        break;
      }
    }
  }
  return result;
}

function calculateItemsPrice(itemIdsCountItem) {
  return itemIdsCountItem.map((itemIdCountItem) => {
    itemIdCountItem.itemPrice = itemIdCountItem.count * itemIdCountItem.item.price;
    return itemIdCountItem;
  });
}

function calculateTotalPriceWithPromotion(itemIdsCountItemPrice, promotion) {
  const result = {
    totalPrice: 0,
    saving: 0,
    promotionItems: []
  };
  for (const itemIdCountItemPrice of itemIdsCountItemPrice) {
    result.totalPrice += itemIdCountItemPrice.count * itemIdCountItemPrice.item.price;
  }
  switch (promotion.type) {
    case '满30减6元': {
      if (result.totalPrice >= 30) {
        result.saving = 6;
        result.totalPrice -= result.saving;
      }
      break;
    }
    case '指定菜品半价': {
      for (const itemIdCountItemPrice of itemIdsCountItemPrice) {
        if (promotion.items.indexOf(itemIdCountItemPrice.id) >= 0) {
          result.saving += itemIdCountItemPrice.itemPrice / 2;
          result.promotionItems.push(itemIdCountItemPrice.item);
        }
      }
      result.totalPrice -= result.saving;
      break;
    }
  }
  return result;
}

function calculateTotalPriceInMaxDiscountPrice(itemIdsCountItemPrice, allPromotions) {
  const result = {
    totalPrice: undefined,
    saving: undefined,
    promotion: undefined,
    promotionItems: []
  };
  for (const promotion of allPromotions) {
    const totalPriceSaving = calculateTotalPriceWithPromotion(itemIdsCountItemPrice, promotion);
    if (result.totalPrice === undefined ||
      result.saving < totalPriceSaving.saving) {
      result.totalPrice = totalPriceSaving.totalPrice;
      result.saving = totalPriceSaving.saving;
      if (result.saving > 0) {
        result.promotion = promotion;
        result.promotionItems = totalPriceSaving.promotionItems;
      }
    }
  }
  return result;
}

function createReceipt(itemIdsCountItemPrice, totalPriceSavingPromotion) {
  let result = '============= 订餐明细 =============\n';
  for (const itemIdCountItemPrice of itemIdsCountItemPrice) {
    const { item: { name }, count, itemPrice } = itemIdCountItemPrice;
    result += `${name} x ${count} = ${itemPrice}元\n`;
  }

  const { promotion, promotionItems, saving, totalPrice } = totalPriceSavingPromotion;

  if (promotion !== undefined) {
    result += '-----------------------------------\n';
    result += '使用优惠:\n';
    let type = promotion.type;
    promotionItems.forEach((item, index, arr) => {
      if (index === 0) {
        type += '(';
      }
      type += item.name;
      if (index === arr.length - 1) {
        type += ')';
      } else {
        type += '，';
      }
    });
    result += `${type}，省${saving}元\n`;
  }

  result += '-----------------------------------\n';
  result += `总计：${totalPrice}元\n`;
  result += '===================================';
  return result;
}

function bestCharge(selectedItems) {
  const itemIdsCount = convertSelectedItemToItemIdCount(selectedItems);
  const itemIdsCountItem = conbineItem(itemIdsCount, loadAllItems());
  const itemIdsCountItemPrice = calculateItemsPrice(itemIdsCountItem);
  const totalPriceSavingPromotion = calculateTotalPriceInMaxDiscountPrice(itemIdsCountItemPrice, loadPromotions());
  const receipt = createReceipt(itemIdsCountItemPrice, totalPriceSavingPromotion);
  return receipt;
}

module.exports = {
  convertSelectedItemToItemIdCount,
  conbineItem,
  calculateItemsPrice,
  calculateTotalPriceWithPromotion,
  calculateTotalPriceInMaxDiscountPrice,
  createReceipt,
  bestCharge,
}
