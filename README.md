# BidNova

Simple bidding project starter built with Node.js and Express.

## Features

- Express backend with in-memory auction data
- API to list auctions and place bids
- Basic frontend (HTML/CSS/JS) to view items and submit bids

## Tech Stack

- Node.js
- Express
- Vanilla JavaScript

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm run dev
   ```

3. Open:

   ```text
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/auctions` → list all auctions
- `POST /api/auctions/:id/bids` → place a bid

### Example bid payload

```json
{
  "bidderName": "Ali",
  "bidAmount": 55000
}
```

## Note

Data is stored in memory, so bids reset when server restarts.
