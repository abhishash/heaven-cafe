export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceInCents: number;
  image: string;
  category: string;
  featured?: boolean;
  badge?: string;
  stock?: string;
  in_stock?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce",
    price: 8.99,
    priceInCents: 899,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
    category: "Burgers",
    featured: true,
  },
  {
    id: "2",
    name: "Double Bacon Burger",
    description: "Two beef patties, crispy bacon, Swiss cheese, caramelized onions",
    price: 11.99,
    priceInCents: 1199,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop",
    category: "Burgers",
    featured: true,
    badge: "Popular",
  },
  {
    id: "3",
    name: "Spicy Chicken Sandwich",
    description: "Crispy fried chicken breast with jalapeños, pepper jack cheese, and hot sauce",
    price: 9.49,
    priceInCents: 949,
    image: "https://images.unsplash.com/photo-1562547256-fa26bade0321?w=500&h=500&fit=crop",
    category: "Chicken",
    featured: true,
  },
  {
    id: "4",
    name: "Crispy Fish Fillet",
    description: "Golden fried fish fillet with tartar sauce, lettuce, and tomato",
    price: 8.99,
    priceInCents: 899,
    image: "https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=500&h=500&fit=crop",
    category: "Seafood",
  },
  {
    id: "5",
    name: "Vegetarian Burger",
    description: "Grilled veggie patty with fresh greens, avocado, and herb aioli",
    price: 8.49,
    priceInCents: 849,
    image: "https://images.unsplash.com/photo-1584445604694-26f8f8d6d56f?w=500&h=500&fit=crop",
    category: "Vegetarian",
  },
  {
    id: "6",
    name: "Crispy French Fries",
    description: "Golden fried potatoes seasoned with sea salt",
    price: 3.99,
    priceInCents: 399,
    image: "https://images.unsplash.com/photo-1599599810694-b3b0c47b7fbe?w=500&h=500&fit=crop",
    category: "Sides",
    featured: true,
  },
  {
    id: "7",
    name: "Onion Rings",
    description: "Crispy battered onion rings with dipping sauce",
    price: 4.49,
    priceInCents: 449,
    image: "https://images.unsplash.com/photo-1639024471326-b96128222f52?w=500&h=500&fit=crop",
    category: "Sides",
  },
  {
    id: "8",
    name: "Chicken Tenders",
    description: "Three pieces of breaded chicken tenders with choice of sauce",
    price: 7.99,
    priceInCents: 799,
    image: "https://images.unsplash.com/photo-1585238341710-4913dfb1d008?w=500&h=500&fit=crop",
    category: "Chicken",
  },
  {
    id: "9",
    name: "Ice Cream Shake",
    description: "Creamy vanilla ice cream shake with whipped cream",
    price: 5.49,
    priceInCents: 549,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc933?w=500&h=500&fit=crop",
    category: "Beverages",
    featured: true,
  },
  {
    id: "10",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with ice",
    price: 2.99,
    priceInCents: 299,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop",
    category: "Beverages",
  },
  {
    id: "11",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan, croutons, and Caesar dressing",
    price: 7.99,
    priceInCents: 799,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    category: "Salads",
  },
  {
    id: "12",
    name: "Grilled Chicken Wrap",
    description: "Grilled chicken, mixed greens, tomato, and ranch dressing in a tortilla",
    price: 8.99,
    priceInCents: 899,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
    category: "Wraps",
  },
];

export const categories = ["All", "Burgers", "Chicken", "Seafood", "Vegetarian", "Sides", "Salads", "Wraps", "Beverages"];
