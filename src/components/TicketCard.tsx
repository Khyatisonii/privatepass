import type { Ticket } from '../types/ticket'

interface TicketCardProps {
  ticket: Ticket
  onShowTicket: () => void
}

function TicketCard({ ticket, onShowTicket }: TicketCardProps) {
  return (
    <div className="ticket-shell">
      <div className="ticket-card" aria-label="Event ticket preview">
        <div className="ticket-glow" />
        <div className="ticket-topline">
          <span>PrivatePass</span>
          <span className="chip">Verified</span>
        </div>

        <div className="ticket-header">
          <div>
            <p className="ticket-kicker">Access pass</p>
            <h2>{ticket.eventName}</h2>
          </div>
          <div className="ticket-crest">PP</div>
        </div>

        <div className="ticket-meta">
          <div>
            <span>Location</span>
            <strong>{ticket.location}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>{ticket.date}</strong>
          </div>
        </div>

        <div className="ticket-meta second-row">
          <div>
            <span>Time</span>
            <strong>{ticket.time}</strong>
          </div>
          <div>
            <span>Ticket</span>
            <strong>{ticket.ticketType}</strong>
          </div>
        </div>

        <div className="ticket-footer">
          <span>ID {ticket.id}</span>
          <span className="status-dot" aria-hidden="true" />
        </div>
      </div>

      <button type="button" className="primary-button" onClick={onShowTicket}>
        Show Ticket
      </button>
    </div>
  )
}

export default TicketCard
