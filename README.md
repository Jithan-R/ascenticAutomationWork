# ascenticAutomationWork

 # Introduction 
This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
* This repository consist of web automation task of Ascentic.


### How do I get set up? ###
Pre-requisite softwares and setup
* Node.js needs to be installed
* MS Visual Code as IDE

### How to install the dependencies? ###
* Open the terminal in VS code and write npm install playwright command (this will install all libraries and dependencies under node_modules folder)
* To check the version : npx playwright version
* Download Browsers (Optional): THis is optional as these browsers are comes in handy
    * npx playwright install chromium  # For Chromium
    * npx playwright install firefox     # For Firefox
    * npx playwright install webkit      # For WebKit (Safari)
* To run this without issues, install playwright with TypeScript        

### How to execute the tests? ###
* In terminal write command npx: run test (this will execute the tests in chrome headless mode)
1. npx playwright test                                      : This runs all tests on all browsers in headless mode
2. npx playwright test --worker 3                           : runs with 3 workers in parellel
3. npx playwright test ./tests/testing.spec.ts --headed     : runs the specific test file
4. npx playwright test --headed                             : runs tests in headed mode
5. npx playwright test --debug                              : debug tests4
6. npx playwright test ./tests/testing.spec.ts --debug      : debug specific test file
7. npx playwright codegen                                   : run codegen mode to easily record elements
8. npx playwright show-report                               : View the generated report

### Report generation ###
* It will generate the report automatically, if not it will create html file under folder allure-report after the test execution. Oepn that html folder in any of the browser.

### Who do I talk to? ###
* Repo owner or admin : R Inthirajithan