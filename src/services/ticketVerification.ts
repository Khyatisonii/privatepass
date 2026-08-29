import type { TicketState } from '../types/ticket'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface VerificationCheck {
  success: boolean
  title: string
  detail: string
}

export async function verifyTicket(
  ticketId: string,
  currentStatus: TicketState,
): Promise<VerificationCheck> {
  // TODO: Replace mock verification with Midnight privacy-preserving proof verification.
  await wait(200)

  if (!ticketId) {
    return {
      success: false,
      title: 'Access denied',
      detail: 'Ticket not recognized.',
    }
  }

  if (currentStatus === 'unused') {
    return {
      success: true,
      title: 'Valid ticket verified',
      detail: 'Proof accepted for this event.',
    }
  }

  return {
    success: false,
    title: 'Access denied',
    detail: 'This ticket has already been used.',
  }
}

export function markTicketUsed(ticketId: string): TicketState {
  // TODO: Replace mock state mutation with Midnight verification lifecycle handling.
  return ticketId ? 'used' : 'unused'
}
