export function parseReceiptText(text) {

  if (typeof text !== "string") {
    text = String(text || "");
  }

  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const fullText = lines.join(" ").toLowerCase();

  let merchant = "Unknown";
  let amount = null;
  let date = null;

  // detect merchant (first meaningful line)
  if (lines.length > 0) merchant = lines[0];

  // amount patterns
  const amountRegex = /(₹|rs\.?|inr)?\s?\d+(\.\d{1,2})?/i;

  // date patterns
  const dateRegex =
    /\b(\d{1,2}\s[a-z]{3}\s\d{4}|[a-z]{3}\s\d{1,2},\s\d{4}|\d{2}\/\d{2}\/\d{4})\b/i;

  // detect amounts
  for (const line of lines) {

    const lower = line.toLowerCase();

    if (
      lower.includes("total") ||
      lower.includes("paid") ||
      lower.includes("amount") ||
      lower.includes("debited")
    ) {
      const match = line.match(amountRegex);

      if (match) {
        amount = parseFloat(match[0].replace(/[^\d.]/g, ""));
      }
    }

    const dateMatch = line.match(dateRegex);
    if (dateMatch) date = dateMatch[0];
  }

  // fallback amount detection
  if (!amount) {
    const match = fullText.match(/\d+\.\d{2}/);
    if (match) amount = parseFloat(match[0]);
  }

  return {
    merchant,
    amount,
    date,
    category: detectCategory(fullText),
  };
}

function detectCategory(text) {

  if (text.includes("swiggy") || text.includes("zomato"))
    return "food";

  if (text.includes("uber") || text.includes("ola"))
    return "transportation";

  if (text.includes("amazon") || text.includes("flipkart"))
    return "shopping";

  if (text.includes("netflix") || text.includes("spotify"))
    return "entertainment";

  if (text.includes("medical") || text.includes("pharmacy"))
    return "healthcare";

  return "other-expense";
}