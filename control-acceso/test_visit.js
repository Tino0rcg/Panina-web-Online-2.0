process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function main() {
  const res = await fetch("https://localhost:3000/api/visits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rut: "99.999.999-9",
      full_name: "Test Visitante",
      company_id: "16f5a949-c436-43c7-8873-461a604fb625",
      door_id: "fb823dc2-9ffa-4608-99cd-8bf93db1af05",
      guard_id: "admin-local-id",
      visited_person: "Gerente",
      area: "RRHH",
      reason: "Entrevista"
    })
  })
  console.log("Visit create status:", res.status)
  console.log("Visit create body:", await res.text())
}

main().catch(console.error)
