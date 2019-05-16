# Bamazon
Off brand of your favorite web store

## Standard Flow

Here is the standard flow of the app. A user selects an item based on its ID, they define a quantity, then the app checks inventory to ensure there are enough items. Once successful, it displays the item was updated successfully. There is validation for both inputs, only allowing the user to enter a number (not pictured below).

![](gifs/StandardFlow.gif)

## Over Order

If the user trys to order more than what's available, the app list out the available amount. There are checks and balances here. If they still enter a number over the available inventory, it alerts the user. Once they have entered a number less than or equal to the amount, or have decided to bypass ordering that item, the user is asked if they'd like to continue shopping.

![](gifs/OverOrder.gif)

## Out Of Stock

When and item is out of stock, the user is alerted and asked if they'd like to continue shopping. If they select 'no' the connection is ended.

![](gifs/outofstock.gif)