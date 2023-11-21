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
- The implementation of the tests is available [here](https://github.com/m-radman/QA_Test_Task/tree/main/cypress/e2e/tests).  
- The implementation of the page objectsis available [here](https://github.com/m-radman/QA_Test_Task/tree/main/cypress/e2e/pages).  
- Postman collection `.json` file is available [here](https://github.com/m-radman/QA_Test_Task/blob/main/postman/StoreNewProduct.postman_collection.json)  

## How to run tests  

To run tests locally please follow the steps:  
  
  - `Step1` Clone this repository to your local machine
    > git clone 
  - `Step2` Install dependencies
    > npm install
  - `Step3` Running Cypress tests 
    - To open Cypress and run tests from the browser 
        > npm run cy:open
    - To run all tests in `headless` mode
        > npm run cy:run
    - To run single test file:  
        - run user registration and user login tests
            > npm run cy:run:auth
        - run products filtering and sorting tests
          > npm run cy:run:filters
        - run add/remove product to/from cart tests
          > npm run cy:run:cart
        - run  make an order test
          > npm run cy:run:order
  - `Step4` Running Postman tests
    - To run the Postman collection using Newman (Postman's Collection Runner)  
      > npm run postman:run  
      
    :pushpin: Note: There is two versions of _Storing new product_ test, because POST request in `v4` of the app is working well while POST request in `v5` always gives back 500 Internal Server Error.
