'use client';

import { SupportTicket } from '@/lib/mockData';
import { AlertCircle, CheckCircle, Clock, MessageCircle, ChevronRight } from 'lucide-react';

interface SupportTicketCardProps {
  ticket: SupportTicket;
}

export function SupportTicketCard({ ticket }: SupportTicketCardProps) {
  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'open':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'closed':
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (ticket.status) {
      case 'open':
        return 'bg-red-50 text-red-700';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700';
      case 'resolved':
        return 'bg-green-50 text-green-700';
      case 'closed':
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getPriorityColor = () => {
    switch (ticket.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-semibold text-foreground">{ticket.ticketNumber}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}>
              {ticket.priority}
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-xs font-medium capitalize">{ticket.status}</span>
          </div>
          <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded">
            {ticket.category}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {new Date(ticket.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
