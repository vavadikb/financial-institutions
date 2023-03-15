# Hedge fund

## _Documentation for financial company_

#

- Create passive income
- Control your finances
- Control your finance, control your life

## For developers

This part of documentation discribe technologies, routing and comunication with API

- Main framework is Express
- This project use Sequalize like main ORM to make relation databases
- Database: PostgreSQL

## Routing

- '/login' - POST page for login will create post request with username or gmail and password to log in account, check username in database
- '/reigstration' - POST route to create new user, making post request with username and password, server check if this username created
- '/' - GET shows main page
- '/invest-list' - GET shows opyions to investment for different ways, shows stock partolioss, precentage of annual income and risks
- '/my-account' GET shows your accaunt details: your orers for invest, how much money do you have, how much money you earned
- '/investments' - GET creating stock portfolio for user
- '/about-us' - GET page shows history of company
- '/stop-invest' - PUT/POST take profit and stop your acctive orders
- '/my-accaunt/active' - GET/POST/DELETE shows your active orders, can delete or create orders
