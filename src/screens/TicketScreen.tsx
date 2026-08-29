import type { Ticket } from '../types/ticket'

interface TicketScreenProps {
  ticket: Ticket
  onBack: () => void
}

function TicketScreen({ ticket, onBack }: TicketScreenProps) {
  return (
    <div className="screen ticket-screen">
      <header className="ticket-header-row">
        <button type="button" className="back-button" onClick={onBack}>
          ← Back
        </button>
        <span className="screen-tag">Ticket</span>
      </header>

      <main className="ticket-details">
        <div className="ticket-identity">
          <p className="eyebrow">PrivatePass</p>
          <h2>{ticket.eventName}</h2>
        </div>

        <div className="event-grid">
          <div>
            <span>Date</span>
            <strong>{ticket.date}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{ticket.location}</strong>
          </div>
        </div>

        <div className="event-grid single-row">
          <div>
            <span>Ticket type</span>
            <strong>{ticket.ticketType}</strong>
          </div>
        </div>

        <div className="qr-card" aria-label="Ticket QR code placeholder">
          <div className="qr-code" aria-hidden="true" />
        </div>

        <div className="ticket-info-lines">
          <div className="field-row">
            <span>Ticket ID:</span>
            <strong>{ticket.id}</strong>
          </div>
          <div className="field-row status-row">
            <span>Status:</span>
            <strong className="valid-status">● VALID</strong>
          </div>
        </div>

        <p className="verification-ready">Ready for verification</p>

        <div className="privacy-banner">
          🔐 Your identity is not shared during verification.
        </div>
      </main>
    </div>
  )
}

export default TicketScreen
