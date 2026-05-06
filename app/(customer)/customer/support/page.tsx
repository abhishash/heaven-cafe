'use client';

import { useState } from 'react';
import { mockChatMessages, mockFAQs, mockSupportTickets } from '@/lib/mockData';
import { CustomerLayout } from '@/components/customer/CustomerLayout';
import { ChatMessage } from '@/components/customer/ChatMessage';
import { SupportTicketCard } from '@/components/customer/SupportTicketCard';
import { FAQItem } from '@/components/customer/FAQItem';
import { MessageCircle, Ticket, HelpCircle, Send, Plus } from 'lucide-react';
import { useGetFAQQuery } from '@/store/services/master-api';

type SupportTab = 'chat' | 'tickets' | 'faq';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<SupportTab>('chat');
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [tickets, setTickets] = useState(mockSupportTickets);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  const { data, isLoading } = useGetFAQQuery();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: String(messages.length + 1),
      senderId: 'user' as const,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      senderName: 'You',
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! We're here to help.",
        "Can you provide more details about your issue?",
        "We're looking into this for you.",
        "Thank you for your patience!",
      ];
      const response = {
        id: String(messages.length + 2),
        senderId: 'support' as const,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        senderName: 'Support Team',
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewTicketForm(false);
    // In a real app, this would save the ticket
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Customer Support</h1>
        <p className="text-muted-foreground">Get help with your orders and account</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-8 overflow-x-auto">
        {[
          { id: 'chat', label: 'Live Chat', icon: MessageCircle },
          { id: 'tickets', label: 'Support Tickets', icon: Ticket },
          { id: 'faq', label: 'FAQ', icon: HelpCircle },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as SupportTab)}
            className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === id
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>

      {/* Live Chat Tab */}
      {activeTab === 'chat' && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Chat Messages */}
          <div className="md:col-span-2 bg-card rounded-lg border border-border flex flex-col h-96 md:h-auto">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-input"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Chat Info */}
          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg border border-primary/20 p-4">
              <h3 className="font-semibold text-foreground mb-2">We&apos;re here to help!</h3>
              <p className="text-sm text-muted-foreground mb-4">Our support team typically responds within 5 minutes during business hours (8 AM - 10 PM).</p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground"><span className="font-medium">Response time:</span> ~5 min</p>
                <p className="text-muted-foreground"><span className="font-medium">Available:</span> 8 AM - 10 PM</p>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground mb-3">Common Issues</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Order status</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Delivery problems</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Billing & payments</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Account issues</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Support Tickets Tab */}
      {activeTab === 'tickets' && (
        <div>
          <div className="mb-6">
            <button
              onClick={() => setShowNewTicketForm(!showNewTicketForm)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Ticket
            </button>
          </div>

          {/* New Ticket Form */}
          {showNewTicketForm && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Create Support Ticket</h3>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-input">
                      <option>Order</option>
                      <option>Delivery</option>
                      <option>Quality</option>
                      <option>Account</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-input">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    placeholder="Provide details about your issue"
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-input"
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Create Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTicketForm(false)}
                    className="flex-1 border border-border text-foreground py-2 rounded-lg font-semibold hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          <div className="space-y-4">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <SupportTicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No support tickets yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div>
          {/* FAQ Items */}
          <div className="space-y-2 bg-primary/5 border border-primary/20 rounded-xl">
            {data?.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.name}
                answer={faq.description}
                isOpen={false}
              />
            ))}
          </div>

          {/* Still Need Help */}
          <div className="mt-8 bg-primary/5 rounded-lg border border-primary/20 p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Didn&apos;t find your answer?</h3>
            <p className="text-muted-foreground mb-4">Feel free to reach out to our support team</p>
            <button
              onClick={() => setActiveTab('chat')}
              className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Start Live Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
