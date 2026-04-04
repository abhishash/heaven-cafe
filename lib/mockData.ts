// Mock data for cafe/restaurant customer pages

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
  deliveryAddress: Address;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  membershipTier: 'bronze' | 'silver' | 'gold';
}

export interface ChatMessage {
  id: string;
  senderId: 'user' | 'support';
  message: string;
  timestamp: string;
  senderName: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'order' | 'delivery' | 'quality' | 'account' | 'other';
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high';
}

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Sarah Anderson',
  email: 'sarah.anderson@email.com',
  phoneNumber: '+1 (555) 123-4567',
  joinDate: '2022-03-15',
  totalOrders: 24,
  membershipTier: 'gold',
};

// Mock addresses
export const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    label: 'Home',
    street: '123 Main Street, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    phoneNumber: '+1 (555) 123-4567',
    isDefault: true,
  },
  {
    id: '2',
    type: 'work',
    label: 'Work',
    street: '456 Business Ave, Suite 200',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    phoneNumber: '+1 (555) 987-6543',
    isDefault: false,
  },
  {
    id: '3',
    type: 'other',
    label: 'Gym',
    street: '789 Fitness Blvd',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94104',
    phoneNumber: '+1 (555) 123-4567',
    isDefault: false,
  },
];

// Mock orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-04-02',
    status: 'delivered',
    total: 42.50,
    items: [
      { id: '1', name: 'Cappuccino', quantity: 2, price: 5.50 },
      { id: '2', name: 'Croissant', quantity: 2, price: 4.75 },
      { id: '3', name: 'Avocado Toast', quantity: 1, price: 8.50 },
      { id: '4', name: 'Blueberry Muffin', quantity: 1, price: 4.25 },
    ],
    deliveryAddress: mockAddresses[0],
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-04-01',
    status: 'delivered',
    total: 58.75,
    items: [
      { id: '5', name: 'Espresso', quantity: 3, price: 4.00 },
      { id: '6', name: 'Iced Latte', quantity: 1, price: 6.25 },
      { id: '7', name: 'Grilled Cheese Sandwich', quantity: 2, price: 9.50 },
      { id: '8', name: 'Greek Salad', quantity: 1, price: 12.75 },
    ],
    deliveryAddress: mockAddresses[0],
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-03-30',
    status: 'processing',
    total: 35.25,
    items: [
      { id: '9', name: 'Americano', quantity: 2, price: 4.00 },
      { id: '10', name: 'Blueberry Pancakes', quantity: 1, price: 11.50 },
      { id: '11', name: 'Fresh Fruit Smoothie', quantity: 1, price: 8.75 },
    ],
    deliveryAddress: mockAddresses[1],
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-03-25',
    status: 'cancelled',
    total: 28.50,
    items: [
      { id: '12', name: 'Vanilla Latte', quantity: 1, price: 5.75 },
      { id: '13', name: 'Chocolate Cake', quantity: 1, price: 7.25 },
    ],
    deliveryAddress: mockAddresses[0],
  },
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'support',
    message: 'Hi Sarah! How can we help you today?',
    timestamp: '2024-04-04 10:00 AM',
    senderName: 'Support Team',
  },
  {
    id: '2',
    senderId: 'user',
    message: 'Hi! I have a question about my last order.',
    timestamp: '2024-04-04 10:02 AM',
    senderName: 'You',
  },
  {
    id: '3',
    senderId: 'support',
    message: 'Of course! We\'re here to help. What\'s your question?',
    timestamp: '2024-04-04 10:03 AM',
    senderName: 'Support Team',
  },
  {
    id: '4',
    senderId: 'user',
    message: 'I ordered a cappuccino but received a latte instead. Can this be corrected?',
    timestamp: '2024-04-04 10:04 AM',
    senderName: 'You',
  },
  {
    id: '5',
    senderId: 'support',
    message: 'I sincerely apologize for that mix-up! We\'ll send a replacement cappuccino right away. Can you provide your order number?',
    timestamp: '2024-04-04 10:05 AM',
    senderName: 'Support Team',
  },
];

// Mock FAQ items
export const mockFAQs = [
  {
    id: '1',
    question: 'What are your delivery hours?',
    answer: 'We deliver from 7 AM to 10 PM, Monday through Sunday. Orders are typically delivered within 30-45 minutes.',
  },
  {
    id: '2',
    question: 'Do you offer contactless delivery?',
    answer: 'Yes! You can request contactless delivery during checkout. Our drivers will leave your order at your door and inform you via message.',
  },
  {
    id: '3',
    question: 'What is your refund policy?',
    answer: 'We offer full refunds for orders that don\'t meet our quality standards. Please contact support within 30 minutes of delivery.',
  },
  {
    id: '4',
    question: 'Can I modify my order after placing it?',
    answer: 'Orders can be modified within 5 minutes of placement. After that, please contact our support team and we\'ll do our best to help.',
  },
  {
    id: '5',
    question: 'Do you have a loyalty program?',
    answer: 'Yes! Our Gold membership provides 10% off all orders, free delivery, and exclusive seasonal specials. Join today!',
  },
  {
    id: '6',
    question: 'Are there allergen options available?',
    answer: 'We have detailed allergen information for all items. Check the menu details for allergen labels and feel free to contact us with questions.',
  },
];

// Mock support tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-2024-001',
    subject: 'Wrong item in order',
    description: 'I ordered a cappuccino but received a latte instead. Please help me resolve this issue.',
    status: 'in-progress',
    category: 'order',
    createdAt: '2024-04-04',
    updatedAt: '2024-04-04',
    priority: 'high',
  },
  {
    id: '2',
    ticketNumber: 'TKT-2024-002',
    subject: 'Late delivery',
    description: 'My order arrived 1 hour later than expected. I would like to know why and if compensation is available.',
    status: 'resolved',
    category: 'delivery',
    createdAt: '2024-03-30',
    updatedAt: '2024-04-01',
    priority: 'medium',
  },
  {
    id: '3',
    ticketNumber: 'TKT-2024-003',
    subject: 'Account access issue',
    description: 'I cannot log into my account. I\'ve tried resetting my password but it\'s not working.',
    status: 'open',
    category: 'account',
    createdAt: '2024-04-03',
    updatedAt: '2024-04-03',
    priority: 'high',
  },
  {
    id: '4',
    ticketNumber: 'TKT-2024-004',
    subject: 'Quality concern',
    description: 'The pastry I received was stale. The taste was not fresh.',
    status: 'resolved',
    category: 'quality',
    createdAt: '2024-03-25',
    updatedAt: '2024-03-27',
    priority: 'medium',
  },
];
