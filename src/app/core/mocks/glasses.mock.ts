export interface Glass {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'sole' | 'vista' | 'sport';
  image_url: string;
}

export const GLASSES_MOCK: Glass[] = [
  {
    id: '1',
    name: 'Aviator Legend',
    brand: 'Balsi Gold Edition',
    price: 219,
    category: 'sole',
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
  },
  {
    id: '2',
    name: 'Geo Frame',
    brand: 'Balsi Studio',
    price: 175,
    category: 'vista',
    image_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80',
  },
  {
    id: '3',
    name: 'Phantom Noir',
    brand: 'Balsi Black Series',
    price: 289,
    category: 'sole',
    image_url: 'https://images.unsplash.com/photo-1553735945-4f4c04e09db3?w=600&q=80',
  },
  {
    id: '4',
    name: 'Alpine Sport',
    brand: 'Balsi Performance',
    price: 245,
    category: 'sport',
    image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80',
  },
  {
    id: '5',
    name: 'Luce Naturale',
    brand: 'Balsi Studio',
    price: 159,
    category: 'vista',
    image_url: 'https://images.unsplash.com/photo-1561728130-afd430af0493?w=600&q=80',
  },
  {
    id: '6',
    name: 'Terracotta Sun',
    brand: 'Balsi Copper Edition',
    price: 199,
    category: 'sole',
    image_url: 'https://images.unsplash.com/photo-1614715838888-5714027dc81e?w=600&q=80',
  },
];
