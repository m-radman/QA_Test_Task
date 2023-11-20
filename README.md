# QA ENGINEER TEST TASK  
---

## Task Requirements:  

 Application under test: https://practicesoftwaretesting.com/  


### Part I - Manual Testing
 Focus is on the following:  
  
  1. Register as a new user and login
  2. Search and filter for the products
  3. Add at least two different products from different categories to the cart
  4. Checkout and make a payment  
    
 For each of these tasks:  
  
  1. Analyze the behaviour and write at least one bug report
  2. Write test cases to cover relevant scenarios


### Part II - Automation & API  
  1. Automate written test cases in the Cypress automation framework
  2. Using Postman, write a test case with correct assertion for storing a new product. Documentation is available [here](https://api.practicesoftwaretesting.com/api/documentation).  
  
## Execution  
### Part I  
- Spreadsheet with scenarios, test cases, bug reports and potential improvements is available [here](https://docs.google.com/spreadsheets/d/14ju3isJk3bi0kZKLkpp9aRsbBFPPuSwLYaSyFumodAc/edit?usp=sharing).  

### Part II  
- The implementation of the tests you can find [here](https://github.com/m-radman/QA_Test_Task/tree/main/cypress/e2e/tests).  
- The implementation of the page objects you can find [here](https://github.com/m-radman/QA_Test_Task/tree/main/cypress/e2e/pages).  
- Postman collection `.json` file you can see [here](https://github.com/m-radman/QA_Test_Task/blob/main/postman/StoreNewProduct.postman_collection.json)  

## How to run tests  
For running the test you need to take next steps:  
  
  1. Clone this repository to your local machine.
  2. Install dependencies using `npm install`
  3. Run tests using these commands:  
     - To open Cypress and run tests from the browser `npm run cy:open`
     - To run tests in headless mode `npm run cy:run`
     - To run single test file:  
        
         - `npm run cy:run:auth` for the user registration and the user login tests  
         - `npm run cy:run:filters` for the products filtering and sorting tests  
         - `npm run cy:run:cart` for the add/remove product to/from the cart tests  
         - `npm run cy:run:order` for the make an order test  
      - To run the Postman collection `npm run postman:run`
