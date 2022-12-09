# CRM App Project 

Building a CRM Application as my project. Building the database and APIs needed to run a CRM application that will help to manage all the business leads at one place and provide a complete picture of all customer interactions.

## What is CRM?
__CRM i.e. Customer Relationship Management refers to creating, developing, and maintaining a relationship with customers__

## Use of CRM
- Identify potential customers 
- Increase the number of customers 
- Maintain profitable relationships with customers 
- Provide insights into the customers


## Problem Statement
**“Create a CRM application that can be leveraged to accept the customer complaints and provide the complete life cycle management of the issues raised by the customers.”**

#### Explanation: 
- We have to create a system which would handle the complaints logged by the customer.
- The complaints will be logged as a ticket and they will be fixed by the engineer. 
- We need to manage this complete life-cycle using our application. 
- Admin can keep track of the complete life cycle of the issue from logging of complaints as a ticket, fixing and updating the ticket

## Tech Stack

### Node.js - 
We are using the Node.js environment for our application. JavaScript used to only work inside the browsers. For running JS code, browsers use the JavaScript engine. NodeJS is a JavaScript runtime environment that allows us to run JS code outside of a web browser. To achieve this, NodeJS uses Chrome’s V8 Engine which is open source(free to use) and very performant. A Node.js app runs in a single process, without creating a new thread for every request.

### Express Framework - 
Express is a Node.js web application framework that provides multiple features to develop web and mobile applications. Features – 
1) Middleware between requests 
2) Routing Concept 
3) Dynamic Operations 
4) Asynchronous Operations

### MongoDB
We are using MongoDB as our database. MongoDB is a document-oriented database that is non-structured. We can have a dynamic schema that can be scaled easily. It stores data in the form of documents that are in JSON format that are scalable and easier to maintain without keeping some specific constant structure.

### Mongoose -
We are using Mongoose as our object modeling tool. It is used to do object mapping between Nodejs and MongoDB. We can use it as an interface to the database which can be used to create, update, delete and query the records.


## PROJECT Design

### ACTORS

##### Customers
- I should be able to register myself 
- I should be able to login myself for registering/viewing complains 
- I should be able to raise an issue 
- I should be able to check the latest status of the issues 
- I raised I should be able to modify the issue raised 
- I should be able to check the complete history of the issues raised 
- I should be able to close my ticket myself

##### Engineer 
- I should be able to accept an issue 
- I should be able to update an issue 
- I should be able to close an issue 
- I should be able to see the complete list of issues assigned to me 
- I should be able to search for an issue 
- I should be able to filter the issues assigned to me based on the creation date

##### Admin 
- I should be able to see all the customer's non-PII details 
- I should be able to see all the Engineers 
- I should be able to see all the tickets details 
- I should be able to see all the active tickets 
- I should be able to filter the tickets based on status | date, etc 
- I should be able to re-assign a ticket to another Engineer 
- I should be able to add a new Engineer 
- I should be able to remove an Engineer