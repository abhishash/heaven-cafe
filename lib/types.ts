import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating'
export interface ProductsDataTypes {
  id: number;
  name: string;
  position: number;
  products: ProductTypes[];
  banner: string | null;
  url: string;
}

export interface BannerDataTypes {
  id: number,
  name: string,
  image: string
}

export interface HomePageDataTypes {
  data: BannerDataTypes[],
}

export interface ProductTypes {
  url: string;
  name: string;
  image: string;
  price: string;
  ac_price: string;
  stock: number | null;
  in_stock: "0" | "1";
  summer_id: number;
  slug: string | null;
  discount: string | null;
  brand: string;
  short_description: string;
  id: number;
}


export interface PermotionsTypes {
  name: string;
  url_link: string,
  image: string
}


/* Sub Category */
export interface SubCategory {
  url: string;
  name: string;
  image: string;
  products: number;
}

/* Main Category */
export interface Category {
  url: string;
  name: string;
  image: string;
  subCategories?: SubCategory[];
  subcategories?:  SubCategory[]
}

/* API Response */
export interface CategoryResponse {
  status: boolean;
  data: Category[];
}

/* API Response */
export interface FavCategoryResponse {
  status: boolean;
  data: Category;
}

// ------ Product Details API ---------//

export interface ProductResponse {
  status: boolean;
  message: string;
  data: Product;
  gallery: GalleryImage[];
  similar_products: SimilarProduct[];
  aplus: AplusBanner[];
}

export interface ReviewsTypes {

  data: {
    rating: number,
    total_reviews: number,
    reviews: ReviewItems[]
    rating_distribution: {
      stars: number;
      count: number;
      percentage: number;
    }[]
  }
}

export interface ReviewItems {
  user_name: string;
  user_email: string;
  rating: number;
  review: string;
  date: string;
}


export interface AplusBanner {
  type: "single" | "two" | "three",
  images: string[]
}

export interface ProductDataTypesList {
  status: boolean;
  data: ProductTypes[];
  categories : Category[]
}


export interface Product {
  id: number;
  name: string;
  brand_name: string;
  image: string;
  barcode: string;
  url: string;
  price: string;
  ac_price: string;
  sku: string;
  sku_code: string;
  hsn: string;
  description: string;
  tags: string;
  meta_tag: string;
  category: string | null;
  sub_category: string | null;
  stock: string;
  in_stock: "0" | "1";
  category_url: string | null;
  sub_category_url: string | null;
  rating: string;
  review: string;
}


export interface GalleryImage {
  image: string;
}


export interface SimilarProduct {
  name: string;
  sku: string;
  brand_name: string;
  image: string;
  price: string;
  ac_price: string;
  hsn: string;
  description: string | null;
  barcode: string; // base64 image
  url: string;
}



export interface CartItem {
  id: number;
  cart_id: number;
  name: string;
  price: number;
  customization? : string;
  image?: string;
  qty: number;
  product_id: string;
}

export interface CartItemPayload {
  id: number;
  cart_id: number;
  name: string;
  price: number;
  image?: string;
  qty: string;
  product_id: string;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  totalAmount: number;
  totalPrice: number;
  initialized: boolean;
}

export interface UserAddress {
  id: number;
  userId: number;
  is_default: number;
  person: string;
  landmark: string;
  country: string;
  state: string;
  district: string;
  tehsil: string;
  block: string;
  village: string;
  address: string;
  pincode: number;
  personName: string;
  contact: string;
  street: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressResponse {
  data: UserAddress[];
}

export type PaymentMethod = 'card' | 'apple' | 'paypal' | 'google';


export interface OrderProducts {
  id: number;
  order_no: string;
  status: string;
  total_amount: number;
  final_amount: number;
  payment_method: string;
  created_at: string;
  order_rating: {
    id: number,
    order_id: number,
    rating: number,
    review: string,
  };
  products: {
    id: number,
    name: string,
    image: string,
  }[]
}


export interface OrderResponse {
  status: boolean;
  message: string;
  data: Order;
}

export interface Order {
  id: number;
  order_no: string;
  user_id: number;
  address_id: number;
  total_amount: string;
  total_discount: string;
  final_amount: string;
  status: string;
  payment_status: string;
  payment_method: string;
  delhivery_boy_id: number | null;
  barcode: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];

}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  price: string;
  discount: string;
  final_price: string;
  created_at: string;
  updated_at: string;
  product: Product;
}


export interface CmsResponse {
  status: boolean;
  message: string;
  data: Record<string, CmsItem[]>;
}

export interface CmsItem {
  id: number;
  category: string;
  name: string;
  url: string;
}