import React from 'react';
import '../styles/TicketCard.css';

const TicketCard = ({ ticket }) => (
  <div className="ticket-card">
    <h3>{ticket.title}</h3>
    <p><strong>Status:</strong> {ticket.status}</p>
    <p><strong>Assigned To:</strong> {ticket.assigned_to || 'Unassigned'}</p>
    <p><strong>Priority:</strong> {ticket.priority}</p>
  </div>
);

export default TicketCard;
