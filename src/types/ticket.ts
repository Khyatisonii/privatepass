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
