import { SCHEMA_KEYS } from "./constants.js";
import { saveOrder } from "./dbConnector.js";

export function validateOrderData(orderData, orderSummery) {
  return (SCHEMA_KEYS.every((key) => Object.keys(orderData).includes(key)) && orderSummery.orderId==orderData.orderId);
}

export function setDefalutOrderData(orderDataList) {
  return {
    orderId: orderDataList[0].orderId,
    orderDate: orderDataList[0].orderDate,
    totalQty: 0,
    totalPrice: 0,
  };
}

export async function processOrderData(orderDataList) {
  console.log(`Processing Order Data ${JSON.stringify(orderDataList)}`);

  let orderSummery = setDefalutOrderData(orderDataList);

  orderDataList.every(function (orderData) {
    if (validateOrderData(orderData, orderSummery)) {
      orderSummery.totalPrice = parseFloat(orderSummery.totalPrice) + parseFloat(orderData.lineTotal);
      orderSummery.totalQty = parseFloat(orderSummery.totalQty) + parseFloat(orderData.qty);
      return true;
    } else {
      // for simplicity invalid data will be logged (otherwise can be sent DLQ or saved in seperate location).
      console.error(`Invalid format of Data, please review ${JSON.stringify(orderDataList)}`);
      orderSummery = null;
      return false;
    }
  });

  if (orderSummery) {
    await saveOrder({
      orderId: orderSummery.orderId,
      orderDate: orderSummery.orderDate,
      totalQty: orderSummery.totalQty,
      totalPrice: orderSummery.totalPrice,
    });
  }
}