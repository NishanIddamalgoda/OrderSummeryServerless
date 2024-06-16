import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ORDER_TABLE } from "./constants.js";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function saveOrder(order) {
  try {
    await dynamoDbClient.send(
      new PutCommand({
        TableName: ORDER_TABLE,
        Item: order,
      })
    );

    console.log(`Successfully saved the order :${order}`);
  } catch (error) {
    console.log(`Error occurred ${error}`);
  }
}
