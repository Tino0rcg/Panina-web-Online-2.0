process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

fetch("https://localhost:3000/api/remote-scan", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ data: "12345678-9" })
}).then(async res => {
  console.log("Status:", res.status);
  console.log("Body:", await res.text());
}).catch(console.error);
