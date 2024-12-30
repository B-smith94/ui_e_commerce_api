# User Interface for the E-Commerce API

Author: Byron Smith

Date of most recent update: 12/30/24

Welcome to the E-Commerce API!  Below is a guide on how to navigate and use the application.

## Table of Contents

1. Home Page
2. Add/Edit Customer
3. View Customer Details
4. Add/Edit Product
5. View Product Details
6. Make an Order
7. View Active Orders

### 1. Home Page
![e_commerce_home](https://github.com/user-attachments/assets/fe93378d-efe3-476e-af38-8228e441dce5)

The home page contains several buttons that link to different parts of the application. 
Simply click a button and it will take you to that page. You can also find these pages on the Navigation
Bar on the top of every page.

### 2. Add/Edit Customer
![e_commerce_add_customer](https://github.com/user-attachments/assets/84ab6b72-4e6d-43e0-adee-46cd6b065e7b)

The Add/Edit Custommer page has two functions. The first, which is the page you will navigate to if you 
click on either the link on the Home Page or use the Navigation Bar on the top, is the _Add Customer_.
Fill in the details in the appropriate field, then click Submit, and the program will update the E-Commerce API
with the new information. The second function appears when you navigate here from the Customers page by clicking 
the edit button next to any of the listed customers. This takes you to the _Edit Customer_ page, which will 
fill in the fields with the selected customer's information for you to edit.

### 3. View Customer Details
![e_commerce_customers](https://github.com/user-attachments/assets/98ea8919-1150-46ae-bfde-11a36eea00d4)

Here you will find a list of all current customers, along with their email address, phone number, and Customer ID.
There are also 2 buttons connected to each customer. The _Edit_ button will redirect you to the Edit Customers
page, which will allow you to change the customer details as previously detailed above. The _Delete_ button
will remove the customer from the database. __WARNING:__ Deleting a customer from the database is irreversible.

### 4. Add/Edit Product
![e_commerce_add_product](https://github.com/user-attachments/assets/602a7a1d-cc29-43c7-b8fc-a313a15e44ed)

This page will function similar to the Add/Edit Customer pages. If you navigate here from the Home Page or 
by clicking on _Add Product_ on the Navigation Bar, you can add a product by filling out the form fields.
If you navigate here through the Edit buttons on the _Products_ page, you can edit the information of
specific products. 

### 5. View Product Details
![e_commerce_products](https://github.com/user-attachments/assets/5e9754c8-1471-452f-b735-9c52623f62af)

Here you will find a list of each product, their associated Product ID, and the price for each product.
Clicking the Edit button will redirect you to the _Edit Products_ page, where you can edit the details
of individual products. Clicking the Delete button will remove the product from the database.
__WARNING:__ Deleting a product from the database is irreversable.

### 6. Make an Order
![e_commerce_make_order](https://github.com/user-attachments/assets/a75a04d7-c3e3-4e30-808d-ea09e3ec933a)

You can create an order to put in the database by filling out the fields here. You will need a customer ID
and product ID to reference, as well as the date ordered and expected delivery date. For the ID's, reference
the _Customers_ and _Products_ pages.

### 7. View Order Details
![e_commerce_orders](https://github.com/user-attachments/assets/d71fe350-b3f3-431a-8043-8054e5fd97d3)

Here you will find detailed information about each product, including the name of the product, the ID of the
customer who ordered it, when it was ordered, and when it is expected to arrive.

Link to the E_Commerce API used for this project: [E-Commerce API](https://github.com/B-smith94/e_commerce_api "E-Commerce API")

