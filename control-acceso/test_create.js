process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function main() {
  const res = await fetch("https://localhost:3000/api/doors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Puerta Principal Test" })
  })
  console.log("Door create status:", res.status)
  console.log("Door create body:", await res.text())

  const res2 = await fetch("https://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@test.com", password: "test", full_name: "Test User", role: "guard" })
  })
  console.log("User create status:", res2.status)
  console.log("User create body:", await res2.text())
}

main().catch(console.error)
