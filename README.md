# OrderSummeryServerless

The application mainly aims to create a single-line summary by analyzing the order line item information. 
The order line items data flow from two sources:
  1. Through SQS integrated with the main order processing system.
  2. Through Json files uploaded to S3 buck from manual processing.

The main function will capture events and data from the above two sources, analyze them, and save them in the Dynamodb table.

High-Level Architecture
![OrderSummeryDesign](https://github.com/NishanIddamalgoda/OrderSummeryServerless/assets/33596793/9edb04f9-5421-4490-82b1-42773311b745)

Deployment Architecture
![OrderSummeryDesign (1)](https://github.com/NishanIddamalgoda/OrderSummeryServerless/assets/33596793/29004e1b-f776-44c6-8d55-576090e87d43)

# Setup & Run
Please find the instructions
https://drive.google.com/file/d/1eE2Vr_C-ECpXaY8vmjWIbN_ZgqKpOxEd/view?usp=sharing

Special note: there is a possibility that the S3 bucket name in the below line should be changed accordingly since it should be globally unique.

# Test & Run
Please find the instructions
https://drive.google.com/file/d/1YPf30Im94TO1-26bKW_vls6fdVJR-7Qw/view?usp=sharing
