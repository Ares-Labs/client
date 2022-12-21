# Documentation about setting up the client
This document will explain how you can deploy the client side of the POC on your device.

## Prerequisites
1. Make sure you've got `node` installed
2. Make sure you've got `npm` installed
3. Make sure you've got `java` installed

## Cloning from git
To get started with the project, you will first have to clone the client repo from git. This can be done in 2 ways!
## Clone the client:
* SSH: `git@git.ti.howest.be:TI/2022-2023/s3/analysis-and-development-project/projects/group-06/client.git`
* HTTPS: `https://git.ti.howest.be/TI/2022-2023/s3/analysis-and-development-project/projects/group-06/client.git`

## User guide
1. Run the server via your favourite IDE or via the CLI. (If you want to know how to do this use the server README)
>* [Server README](https://git.ti.howest.be/TI/2022-2023/s3/analysis-and-development-project/projects/group-06/server/-/blob/main/readme.md)
   
2. Run `npm run dev` command in your client terminal.
3. Click on the http://localhost:5173/ link




# Mars web project group-06
This is the client-side start project for the Analysis and Development project.

Create your client-side project in this repo.

## Important public urls  
* Web project: https://project-ii.ti.howest.be/mars-06/
* Sonar reports: https://sonar.ti.howest.be/dashboard?id=2022.project-ii%3Amars-client-06

## Please complete the following instructions before committing the **final version** on the project
Please **add** any **instructions** required to: 
* make your application work if applicable 
* be able to test the application (credentials, populated db, ...)
* view the wireframes.

Also clarify
* If there are known **bugs**.
* If you haven't managed to finish certain required functionality.

## Instructions for testing locally
* Run the mars-server with gradle run (through your IDE)
* Open the mars-client in phpstorm/webstorm
  * Navigate to the index.html
  * Click on a browser icon at the top right of your IDE to host the mars-client.
  
## Instruction for testing the web client locally with a deployed mars-server
* Open the mars-client in phpstorm
  * Copy the following settings to **config.json** (make sure to replace the XX)
```json
      {
        "host": "https://project-ii.ti.howest.be",
        "folder": "",
        "group": "mars-XX"
      }
```
  * Navigate to the index.html
  * Click on a browser icon at the top right of your IDE to host the mars-client.
  * Make sure to undo the settings once you are done testing the remote server!

## Instructions for local quality checks
You can run the validators for html, CSS and JS rules locally. 

Make sure **npm** is installed.

There is no need to push to the server to check if you are compliant with our rules. 

In the interest of sparing the server, please result to local testing as often as possible. 

If everyone pushes to test, the remote will not last. 

Open a terminal in your IDE
  - Make sure you are in the root folder of the client project.
  - Execute `npm install` this step is only needed once.
  - Execute `npm run validate-local` for linux/mac users.
  - Execute `npm run validate-local-win` for Windows users. 
  - If there are errors, the program execution will halt and show the first error
  - If there are no errors, a report file will be generated in the `.scannerworks/` directory. 
    - You will find the link to the sonar report in this file 

Hint:

If you want to skip ci remotely, include `[ci skip]` in your commit message. 

This is convenient for when you want to quickly add a certain commit, but do not wish to trigger the whole CI sequence. 

## Default files

### CSS 
The `reset.css` has already been supplied, but it's up to you and your team to add other styles. 

### JavaScript
A demonstration for connecting with the API has already been set up. 

We urge you to divide your JS files into many small JS files. 
