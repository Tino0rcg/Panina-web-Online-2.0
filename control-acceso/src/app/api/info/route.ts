import { NextResponse } from 'next/server'
import os from 'os'

export async function GET() {
  const interfaces = os.networkInterfaces()
  const addresses: string[] = []
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address)
      }
    }
  }

  return NextResponse.json({
    ip: addresses[0] || 'localhost',
    allIps: addresses,
    version: '2.0.0-PRO',
    offline: true
  })
}
