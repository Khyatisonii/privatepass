import { useState } from 'react'
import './App.css'
import GateScreen from './screens/GateScreen'
import HomeScreen from './screens/HomeScreen'
import TicketScreen from './screens/TicketScreen'
import { markTicketUsed, verifyTicket } from './services/ticketVerification'
import type { ScreenView, Ticket } from './types/ticket'
import { demoTicket } from './types/ticket'

function App() {
  const [screen, setScreen] = useState<ScreenView>('home')
  const [ticket, setTicket] = useState<Ticket>({ ...demoTicket })

  const handleVerifyTicket = async () => {
    const verification = await verifyTicket(ticket.id, ticket.status)

    if (verification.success) {
      const nextStatus = markTicketUsed(ticket.id)
      setTicket((current) => ({ ...current, status: nextStatus }))

      return {
        state: 'granted' as const,
        title: 'ACCESS GRANTED',
        detail: 'Valid ticket verified',
        checks: [
          'Ticket validity confirmed',
          'Event eligibility confirmed',
          'Ticket unused',
        ],
      }
    }

    return {
      state: 'denied' as const,
      title: 'ACCESS DENIED',
      detail: 'This ticket has already been used.',
      checks: [],
    }
  }

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          ticket={ticket}
          onShowTicket={() => setScreen('ticket')}
          onOpenGate={() => setScreen('gate')}
        />
      )}

      {screen === 'ticket' && (
        <TicketScreen ticket={ticket} onBack={() => setScreen('home')} />
      )}

      {screen === 'gate' && (
        <GateScreen
          onVerifyTicket={handleVerifyTicket}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  )
}

export default App
