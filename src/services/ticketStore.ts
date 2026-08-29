import type { Ticket, TicketState } from '../types/ticket'
import { demoTickets } from '../data/demoTickets'

const STORAGE_KEY = 'privatepass-demo-tickets'

export function getTickets(): Ticket[] {
  if (typeof window === 'undefined') {
    return demoTickets
  }

  const storedTickets = window.localStorage.getItem(STORAGE_KEY)

  if (!storedTickets) {
    const freshTickets = demoTickets.map((ticket) => ({ ...ticket, status: 'unused' as TicketState }))
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshTickets))
    return freshTickets
  }

  try {
    const parsed = JSON.parse(storedTickets) as Ticket[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : demoTickets
  } catch {
    return demoTickets
  }
}

export function getTicketById(ticketId: string): Ticket | undefined {
  return getTickets().find((ticket) => ticket.id === ticketId)
}

export function markTicketUsed(ticketId: string): Ticket[] {
  const nextTickets = getTickets().map((ticket) =>
    ticket.id === ticketId ? { ...ticket, status: 'used' as TicketState } : ticket,
  )

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTickets))
  }

  return nextTickets
}

export function resetTickets(): Ticket[] {
  const nextTickets = demoTickets.map((ticket) => ({
    ...ticket,
    status: 'unused' as TicketState,
  }))

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTickets))
  }

  return nextTickets
}
