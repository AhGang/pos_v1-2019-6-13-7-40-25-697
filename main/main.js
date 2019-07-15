'use strict';
function getItemList(inputs){
    var list = {}; 
    inputs.forEach(item => {
      if(item.includes("-")){
        let itemDetail = item.split("-");
        list[itemDetail[0]]= list[itemDetail[0]] != null? (list[itemDetail[0]] + parseFloat(itemDetail[1])) : parseFloat(itemDetail[1]);
    }else{
        list[item] = (list[item] +1 ) || 1; 
    }
    })
    return list; 
}
function getBill(ItemList,allItems){
  let receipt = `***<没钱赚商店>收据***\n`;
  let total = 0; 
  let save = 0;

  for(let key in ItemList){
    allItems.forEach(i => {
      if(key == i.barcode){
        let itemPrice = 0;
        itemPrice = checkPromotions(i.barcode,i.price,ItemList[key]);
        receipt = receipt.concat(`名称：${i.name}，数量：${ItemList[key]}${i.unit}，单价：${i.price.toFixed(2)}(元)，小计：${itemPrice.sum.toFixed(2)}(元)\n`)
        total += Number(itemPrice.sum);
        save += Number(itemPrice.save);
      }

    })
  }

  receipt = receipt.concat(`----------------------\n总计：${total.toFixed(2)}(元)\n节省：${save.toFixed(2)}(元)\n**********************`);
  return receipt
}

function checkPromotions(barcode,price,num){
  let value = {sum:'',save:''}; 
  let allPromotions = loadPromotions();
  let bool  = allPromotions[0].barcodes.includes(barcode);
  if(bool){
    value.save = price * Math.floor(num / 3);
    value.sum = price * num - value.save;
  }else{
    value.sum = price * num; 
  }
  return value;
}
function printReceipt(inputs) {
  let allItems = loadAllItems();
  let ItemList = getItemList(inputs);
  let receipt = getBill(ItemList,allItems);
  console.log(receipt)
  return receipt;
}
module.exports = printReceipt;
