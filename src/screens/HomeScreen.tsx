import PrivacyBadge from '../components/PrivacyBadge'
import TicketCard from '../components/TicketCard'
import type { Ticket } from '../types/ticket'

interface HomeScreenProps {
  ticket: Ticket
  tickets: Ticket[]
  selectorOpen: boolean
  onShowTicket: () => void
  onOpenGate: () => void
  onToggleSelector: () => void
  onSelectTicket: (ticketId: string) => void
  onResetDemo: () => void
}

function HomeScreen({
  ticket,
  tickets,
  selectorOpen,
  onShowTicket,
  onOpenGate,
  onToggleSelector,
  onSelectTicket,
  onResetDemo,
}: HomeScreenProps) {
  return (
    <div className="screen home-screen">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">P</div>
          <span>PrivatePass</span>
        </div>
        <PrivacyBadge />
      </header>

      <main className="content">
        <div className="heading-row">
          <h1>My Pass</h1>
        </div>

        <div className="ticket-toolbar">
          <button type="button" className="secondary-button" onClick={onToggleSelector}>
            Change Ticket
          </button>
          <button type="button" className="secondary-button subtle" onClick={onResetDemo}>
            Reset Demo
          </button>
        </div>

        {selectorOpen && (
          <div className="ticket-selector">
            <div className="selector-header">
              <span>Select a ticket</span>
            </div>
            <div className="selector-list">
              {tickets.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`selector-item ${option.id === ticket.id ? 'active' : ''}`}
                  onClick={() => onSelectTicket(option.id)}
                >
                  <span className="selector-ticket-name">{option.eventName}</span>
                  <span className="selector-ticket-meta">
                    {option.id} · {option.status.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <TicketCard ticket={ticket} onShowTicket={onShowTicket} />

        <div className="privacy-note">
          <div className="note-icon" aria-hidden="true">
            🛡️
          </div>
          <div>
            <strong>Your personal information stays private.</strong>
            <p>
              PrivatePass verifies your access without exposing unnecessary
              personal details.
            </p>
          </div>
        </div>

        <div className="privacy-strip">
          <span>Verify access without revealing identity.</span>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>What gets verified</h3>
            <ul>
              <li>✓ Valid ticket</li>
              <li>✓ Correct event</li>
              <li>✓ Ticket unused</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>What stays private</h3>
            <ul>
              <li>🔒 Identity</li>
              <li>🔒 Contact details</li>
              <li>🔒 Personal information</li>
            </ul>
          </div>
        </div>

        <button type="button" className="inline-link" onClick={onOpenGate}>
          Gate verification demo
        </button>
      </main>
    </div>
  )
}

export default HomeScreen
