const auctionList = document.getElementById("auction-list");

async function fetchAuctions() {
  const response = await fetch("/api/auctions");
  if (!response.ok) {
    throw new Error("Failed to load auctions.");
  }
  return response.json();
}

function renderAuctions(auctions) {
  auctionList.innerHTML = "";

  auctions.forEach((auction) => {
    const card = document.createElement("article");
    card.className = "auction-card";
    card.innerHTML = `
      <h2>${auction.itemName}</h2>
      <p class="meta">${auction.description}</p>
      <p class="meta"><strong>Current Bid:</strong> Rs ${auction.currentBid}</p>
      <p class="meta"><strong>Highest Bidder:</strong> ${auction.highestBidder}</p>
      <form class="bid-form" data-id="${auction.id}">
        <input type="text" name="bidderName" placeholder="Your name" required />
        <input type="number" name="bidAmount" placeholder="Your bid amount" required />
        <button type="submit">Place Bid</button>
      </form>
      <p class="message" id="message-${auction.id}"></p>
    `;
    auctionList.appendChild(card);
  });
}

async function placeBid(auctionId, bidderName, bidAmount) {
  const response = await fetch(`/api/auctions/${auctionId}/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bidderName, bidAmount }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to place bid.");
  }
  return data;
}

auctionList.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.dataset.id) {
    return;
  }

  const auctionId = Number(form.dataset.id);
  const bidderName = form.bidderName.value.trim();
  const bidAmount = Number(form.bidAmount.value);
  const message = document.getElementById(`message-${auctionId}`);

  try {
    await placeBid(auctionId, bidderName, bidAmount);
    if (message) {
      message.textContent = "Bid placed successfully.";
      message.style.color = "#065f46";
    }
    init();
  } catch (error) {
    if (message) {
      message.textContent = error.message;
      message.style.color = "#b91c1c";
    }
  }
});

async function init() {
  try {
    const auctions = await fetchAuctions();
    renderAuctions(auctions);
  } catch (error) {
    auctionList.innerHTML = `<p>${error.message}</p>`;
  }
}

init();
