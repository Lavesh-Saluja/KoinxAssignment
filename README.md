# KoinX Assignment

Welcome to the KoinX Assignment project!

## Overview

This project is a Node.js application that provides APIs to fetch cryptocurrency transactions and balances for users. It also includes a cron job to fetch the price of Ethereum every 10 minutes and store it in the database.

## Base URL

Hosted on AWS on my domain [http://koinxassignment.smpco.tech/api/v1](http://koinxassignment.smpco.tech/api/v1)

## API Documentation

### 1. Fetch Crypto Transactions

**Endpoint:** `/transactions`

**Method:** `GET`

**Description:** Fetches the list of cryptocurrency transactions for a given user address.

**Parameters:**  

- `address`: The user's cryptocurrency address. (Provided in the request body)

**Example:**

 /api/v1/transactions
Content-Type: application/json

{
    "address": "0xce94e5621a5f7068253c42558c147480f38b5e0d"
}


### 2. Get User Balance and Ether Price

**Note**: We might get -ve balance for some addresses because according to this assignment we have considered only Normal Transactions

**Endpoint:** `/getBalance`
**Description:** Fetches the user's current balance and the latest price of Ethereum.

**Parameters:**  

- `address`: The user's cryptocurrency address. (Provided in the request body)

Content-Type: application/json

{
    "address": "0xce94e5621a5f7068253c42558c147480f38b5e0d"
}

### 3. Cron Job Task 
**Description:** A cron job runs every 10 minutes to fetch the price of Ethereum from Coingecko API and store it in the database.

### 4. Rate Limiting
**Description:** Applied rate limiting to prevent abuse or DoS attacks on the APIs.

## Project Setup

1. Clone the repository.
2. Copy `example.env` to `config.env` and fill in the required environment variables.

## Running the Project

1. Run `npm install` to install dependencies.
2. Start the server using `npm start`.
3. Access the APIs using the base URL mentioned above.

## Environment Variables

- `PORT`: Port for the server to listen on
- `ETH_SCAN_API_KEY`: Etherscan API key
- `MONGODB_URL`: MongoDB URL