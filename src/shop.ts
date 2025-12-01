
// Базовий тип
type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string; // додаткове поле
};

// Специфічні типи
type Electronics = BaseProduct & {
  category: "electronics";
  warrantyMonths: number;
};

type Clothing = BaseProduct & {
  category: "clothing";
  size: string;
  material: string;
};

type Book = BaseProduct & {
  category: "book";
  author: string;
  pages: number;
};


// Пошук товару за id
const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  return products.find((p) => p.id === id);
};

// Фільтрація за ціною
const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  return products.filter((p) => p.price <= maxPrice);
};



type CartItem<T> = {
  product: T;
  quantity: number;
};

// Додавання товару в кошик
const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  if (!product || quantity <= 0) return cart;
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};

// Підрахунок загальної вартості
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};


// Тестові дані
const electronics: Electronics[] = [
  { id: 1, name: "Телефон", price: 10000, category: "electronics", warrantyMonths: 24 },
  { id: 2, name: "Ноутбук", price: 25000, category: "electronics", warrantyMonths: 12 },
];

const clothes: Clothing[] = [
  { id: 3, name: "Футболка", price: 500, category: "clothing", size: "M", material: "Cotton" },
];

const books: Book[] = [
  { id: 4, name: "Книга TypeScript", price: 300, category: "book", author: "Іваненко", pages: 250 },
];

// Тестування
const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);

const cheapElectronics = filterByPrice(electronics, 15000);
console.log("Електроніка дешевше 15000:", cheapElectronics);

let cart: CartItem<BaseProduct>[] = [];
if (phone) cart = addToCart(cart, phone, 1);
cart = addToCart(cart, clothes[0], 2);
cart = addToCart(cart, books[0], 3);

console.log("Кошик:", cart);
console.log("Загальна вартість:", calculateTotal(cart));