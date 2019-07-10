function convertSelectedItemToItemIdCount(selectedItems) {
  return selectedItems.map((selectedItem) => {
    const arr = selectedItem.split(' x ');
    return {
      id: arr[0],
      count: Number(arr[1]),
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

function bestCharge(selectedItems) {
  return /*TODO*/;
}

module.exports = {
  convertSelectedItemToItemIdCount,
  conbineItem,
  calculateItemsPrice,
}
