import PrivacyBadge from '../components/PrivacyBadge'
import TicketCard from '../components/TicketCard'
import type { Ticket } from '../types/ticket'

interface HomeScreenProps {
  ticket: Ticket
  onShowTicket: () => void
  onOpenGate: () => void
}

function HomeScreen({ ticket, onShowTicket, onOpenGate }: HomeScreenProps) {
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
