import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard';
import GroupSelector from './GroupSelector';
import SortSelector from './SortSelector';
import Loader from './Loader';
import '../styles/KanbanBoard.css';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const KanbanBoard = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTickets(data.tickets || []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const groupTickets = (tickets) => {
    switch (groupBy) {
      case 'user':
        return tickets.reduce((acc, ticket) => {
          const key = ticket.assigned_to || 'Unassigned';
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      case 'priority':
        return tickets.reduce((acc, ticket) => {
          const key = ticket.priority || 'No Priority';
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      case 'status':
      default:
        return tickets.reduce((acc, ticket) => {
          const key = ticket.status || 'Unknown';
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
    }
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets);

  return (
    <div className="kanban-board">
      <div className="controls">
        <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        Object.entries(groupedTickets).map(([key, tickets]) => (
          <div key={key} className="group">
            <h2>{key}</h2>
            <div className="ticket-list">
              {sortTickets(tickets).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default KanbanBoard;
