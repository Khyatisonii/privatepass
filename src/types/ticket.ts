export type TicketState = 'unused' | 'used'
export type ScreenView = 'home' | 'ticket' | 'gate'

export interface Ticket {
  id: string
  eventName: string
  location: string
  date: string
  time: string
  ticketType: string
  status: TicketState
}

export const demoTicket: Ticket = {
  id: 'PP-2026-8F42K',
  eventName: 'THE ERAS TOUR',
  location: 'New Delhi',
  date: '30 AUG 2026',
  time: '8:00 PM',
  ticketType: 'GENERAL ADMISSION',
  status: 'unused',
}
