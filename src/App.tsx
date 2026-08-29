import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { demoTickets } from './data/demoTickets'
import GateScreen from './screens/GateScreen'
import HomeScreen from './screens/HomeScreen'
import TicketScreen from './screens/TicketScreen'
import { getTickets, markTicketUsed, resetTickets } from './services/ticketStore'
import { verifyTicket } from './services/ticketVerification'
import type { ScreenView, Ticket } from './types/ticket'

function App() {
  const [screen, setScreen] = useState<ScreenView>('home')
  const [tickets, setTickets] = useState<Ticket[]>(() => getTickets())
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    () => getTickets()[0]?.id ?? demoTickets[0].id,
  )
  const [selectorOpen, setSelectorOpen] = useState(false)

  const activeTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedTicketId) ?? tickets[0],
    [selectedTicketId, tickets],
  )

  useEffect(() => {
    const storedTickets = getTickets()
    setTickets(storedTickets)

    if (!selectedTicketId && storedTickets[0]) {
      setSelectedTicketId(storedTickets[0].id)
    }
  }, [selectedTicketId])

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    setSelectorOpen(false)
    setScreen('home')
  }

  const handleResetDemo = () => {
    const nextTickets = resetTickets()
    setTickets(nextTickets)
    setSelectedTicketId(nextTickets[0]?.id ?? demoTickets[0].id)
    setScreen('home')
  }

  const handleVerifyTicket = async () => {
    if (!activeTicket) {
      return {
        state: 'denied' as const,
        title: 'ACCESS DENIED',
        detail: 'No active ticket found.',
        checks: [],
      }
    }

    const verification = await verifyTicket(activeTicket.id, activeTicket.status)

    if (verification.success) {
      const nextTickets = markTicketUsed(activeTicket.id)
      setTickets(nextTickets)

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
      {screen === 'home' && activeTicket && (
        <HomeScreen
          ticket={activeTicket}
          tickets={tickets}
          selectorOpen={selectorOpen}
          onShowTicket={() => setScreen('ticket')}
          onOpenGate={() => setScreen('gate')}
          onToggleSelector={() => setSelectorOpen((open) => !open)}
          onSelectTicket={handleSelectTicket}
          onResetDemo={handleResetDemo}
        />
      )}

      {screen === 'ticket' && activeTicket && (
        <TicketScreen
          ticket={activeTicket}
          onBack={() => setScreen('home')}
          onOpenSelector={() => setSelectorOpen(true)}
          onResetDemo={handleResetDemo}
        />
      )}

      {screen === 'gate' && (
        <GateScreen
          ticket={activeTicket}
          onVerifyTicket={handleVerifyTicket}
          onBack={() => setScreen('home')}
          onResetDemo={handleResetDemo}
        />
      )}
    </div>
  )
}

export default App
