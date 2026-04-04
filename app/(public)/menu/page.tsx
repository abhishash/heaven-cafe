import BackPath from '@/components/shared/back-path';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Flame, Leaf, UtensilsCrossed } from 'lucide-react';

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

type MenuSection = {
  title: string;
  note: string;
  items: MenuItem[];
};

const cafeMenu: MenuSection[] = [
  {
    title: 'Signature Coffee',
    note: 'Freshly brewed favorites for every mood.',
    items: [
      {
        name: 'Espresso Shot',
        description: 'Bold single-origin espresso with a rich crema finish.',
        price: 'Rs. 110',
        tag: 'Popular',
      },
      {
        name: 'Cappuccino',
        description: 'Balanced espresso, steamed milk, and airy foam.',
        price: 'Rs. 170',
      },
      {
        name: 'Caramel Latte',
        description: 'Silky latte layered with caramel and light sweetness.',
        price: 'Rs. 195',
        tag: 'Chef Pick',
      },
      {
        name: 'Mocha Hazelnut',
        description: 'Chocolate espresso drink with roasted hazelnut notes.',
        price: 'Rs. 210',
      },
    ],
  },
  {
    title: 'Chillers & Refreshers',
    note: 'Cool drinks for warm afternoons and late-night catchups.',
    items: [
      {
        name: 'Cold Coffee',
        description: 'Classic blended cold coffee with a creamy top.',
        price: 'Rs. 180',
      },
      {
        name: 'Iced Americano',
        description: 'Double espresso poured over ice for a clean finish.',
        price: 'Rs. 150',
      },
      {
        name: 'Strawberry Frappe',
        description: 'Fruity frappe with whipped cream and berry drizzle.',
        price: 'Rs. 225',
        tag: 'New',
      },
      {
        name: 'Mint Lemon Cooler',
        description: 'Citrusy sparkling cooler with garden mint.',
        price: 'Rs. 135',
      },
    ],
  },
  {
    title: 'Cafe Bites',
    note: 'Light plates and sweet bakes to pair with drinks.',
    items: [
      {
        name: 'Grilled Veg Sandwich',
        description: 'Toasties loaded with herbed vegetables and cheese.',
        price: 'Rs. 190',
        tag: 'Best Seller',
      },
      {
        name: 'Chicken Club Sandwich',
        description: 'Triple-layer sandwich with chicken, lettuce, and sauce.',
        price: 'Rs. 240',
      },
      {
        name: 'Blueberry Cheesecake',
        description: 'Creamy baked cheesecake topped with blueberry compote.',
        price: 'Rs. 210',
      },
      {
        name: 'Chocolate Croissant',
        description: 'Flaky butter croissant with molten chocolate center.',
        price: 'Rs. 145',
      },
    ],
  },
];

const restaurantMenu: MenuSection[] = [
  {
    title: 'Starters',
    note: 'Comforting first bites to share around the table.',
    items: [
      {
        name: 'Crispy Corn Pepper',
        description: 'Crunchy sweet corn tossed with peppers and spring onion.',
        price: 'Rs. 220',
        tag: 'Veg',
      },
      {
        name: 'Paneer Tikka',
        description: 'Char-grilled paneer cubes marinated in house spices.',
        price: 'Rs. 295',
        tag: 'Popular',
      },
      {
        name: 'Chicken Malai Kebab',
        description: 'Tender chicken skewers finished with cream and herbs.',
        price: 'Rs. 355',
      },
      {
        name: 'Chilli Garlic Prawns',
        description: 'Wok-tossed prawns with garlic, chilli, and sesame.',
        price: 'Rs. 420',
      },
    ],
  },
  {
    title: 'Main Course',
    note: 'Hearty signature dishes from the kitchen.',
    items: [
      {
        name: 'Veg Handi',
        description: 'Seasonal vegetables simmered in a rich tomato-cashew gravy.',
        price: 'Rs. 320',
        tag: 'Veg',
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Soft paneer in a creamy buttery tomato curry.',
        price: 'Rs. 340',
      },
      {
        name: 'Butter Chicken',
        description: 'Classic tandoori chicken folded into velvety makhani gravy.',
        price: 'Rs. 395',
        tag: 'Best Seller',
      },
      {
        name: 'Mutton Rogan Josh',
        description: 'Slow-cooked mutton curry with Kashmiri spice notes.',
        price: 'Rs. 465',
      },
    ],
  },
  {
    title: 'Breads, Rice & Dessert',
    note: 'The finishing touches to round out the meal.',
    items: [
      {
        name: 'Butter Naan',
        description: 'Soft tandoor-baked naan brushed with butter.',
        price: 'Rs. 65',
      },
      {
        name: 'Veg Dum Biryani',
        description: 'Fragrant basmati layered with vegetables and saffron.',
        price: 'Rs. 310',
      },
      {
        name: 'Chicken Dum Biryani',
        description: 'Aromatic biryani with spiced chicken and fried onions.',
        price: 'Rs. 385',
        tag: 'Popular',
      },
      {
        name: 'Gulab Jamun',
        description: 'Warm milk dumplings served with saffron syrup.',
        price: 'Rs. 120',
      },
    ],
  },
];

function MenuSectionCard({ section }: { section: MenuSection }) {
  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">{section.title}</h3>
          <p className="mt-2 text-sm text-slate-500">{section.note}</p>
        </div>
        <Badge
          variant="secondary"
          className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700"
        >
          Freshly Served
        </Badge>
      </div>

      <div className="space-y-4">
        {section.items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-semibold text-slate-800">{item.name}</h4>
                  {item.tag ? (
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-white">
                      {item.tag}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
              <p className="shrink-0 text-lg font-bold text-orange-600">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <BackPath />
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-600">
            Heaven Cafe
          </p>
        </div>

        <section className="overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-white shadow-xl md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <Badge className="mb-4 rounded-full bg-white/10 px-4 py-1.5 text-orange-200 hover:bg-white/10">
                Crafted for coffee dates and full-course dining
              </Badge>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-balance md:text-5xl">
                Explore our cafe classics and restaurant specials in one place.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Pick your mood, browse the menu, and find everything from creamy lattes
                to rich curries and biryani favorites.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="mb-3 inline-flex rounded-full bg-orange-500/20 p-3 text-orange-200">
                  <Coffee className="size-5" />
                </div>
                <h2 className="text-lg font-semibold">Cafe Menu</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Espresso bar, coolers, desserts, and light bites.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="mb-3 inline-flex rounded-full bg-orange-500/20 p-3 text-orange-200">
                  <UtensilsCrossed className="size-5" />
                </div>
                <h2 className="text-lg font-semibold">Restaurant Menu</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Starters, mains, breads, biryani, and classic desserts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="cafe" className="mt-10 gap-6">
          <TabsList className="h-auto w-full flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm sm:w-fit">
            <TabsTrigger
              value="cafe"
              className="min-w-32 rounded-xl px-5 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Coffee className="size-4" />
              Cafe Menu
            </TabsTrigger>
            <TabsTrigger
              value="restaurant"
              className="min-w-32 rounded-xl px-5 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <UtensilsCrossed className="size-4" />
              Restaurant Menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cafe" className="space-y-6">
            <div className="flex flex-wrap gap-3 text-sm">
              <Badge className="rounded-full bg-orange-100 px-3 py-1 text-orange-700 hover:bg-orange-100">
                <Coffee className="mr-1 size-3.5" />
                Barista Favorites
              </Badge>
              <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                <Leaf className="mr-1 size-3.5" />
                Fresh Ingredients
              </Badge>
            </div>
            <div className="grid gap-6 xl:grid-cols-3">
              {cafeMenu.map((section) => (
                <MenuSectionCard key={section.title} section={section} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurant" className="space-y-6">
            <div className="flex flex-wrap gap-3 text-sm">
              <Badge className="rounded-full bg-amber-100 px-3 py-1 text-amber-700 hover:bg-amber-100">
                <Flame className="mr-1 size-3.5" />
                Kitchen Specials
              </Badge>
              <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-100">
                <UtensilsCrossed className="mr-1 size-3.5" />
                Full Course Dining
              </Badge>
            </div>
            <div className="grid gap-6 xl:grid-cols-3">
              {restaurantMenu.map((section) => (
                <MenuSectionCard key={section.title} section={section} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
