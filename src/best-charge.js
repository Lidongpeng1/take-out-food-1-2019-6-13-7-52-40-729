function convertSelectedItemToItemIdCount(selectedItems) {
  return selectedItems.map((selectedItem) => {
    const arr = selectedItem.split(' x ');
    return {
      id: arr[0],
      count: Number(arr[1]),
    };
  });
}

function bestCharge(selectedItems) {
  return /*TODO*/;
}

module.exports = {
  convertSelectedItemToItemIdCount,
}
