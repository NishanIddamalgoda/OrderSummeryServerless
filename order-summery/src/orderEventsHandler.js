import { SQS_EVENT, S3_EVENT } from "./constants.js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { processOrderData } from "./orderService.js";

export async function createOrderSummery(event) {
  console.info(event);
  const eventSource = event.Records[0].eventSource;

  // process events from s3
  if (eventSource == S3_EVENT) {
    const client = new S3Client({});

    console.info("S3 event triggered");

    const bucket = event.Records[0].s3.bucket.name;
    const Key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: Key,
    });

    try {
      const response = await client.send(command);
      const orderInfoString = await response.Body.transformToString();

      await processOrderData(JSON.parse(orderInfoString));
    } catch (err) {
      console.error(`Invalid format of Data ${err}, please review ${orderInfoString}`);
    }
  }

  // process events from SQS
  if (eventSource == SQS_EVENT) {
    try {
      for (const message of event.Records) {
        await processOrderData(JSON.parse(message.body));
      }
    } catch (err) {
      // for simplicity invalid data will be logged (otherwise can be sent DLQ or saved in seperate location).
      console.error(`Invalid format of Data ${err}, please review ${message.body}`);
    }    
  }
}


