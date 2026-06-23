export type Collezione = 'uomo' | 'donna' | 'kids';

export interface GlassColor {
  /** Nome commerciale del colore, es. "Lucido Nero" */
  name: string;
  /** HEX usato per la pastiglia (swatch) di selezione */
  swatch: string;
  /** Immagine prodotto associata a questa variante colore */
  image: string;
}

export interface Glass {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'sole' | 'vista' | 'sport';
  collezione: Collezione;
  /** Immagine principale (griglia + default dettaglio) */
  image_url: string;
  /** Immagine alternativa zoomata, mostrata in hover nella griglia */
  hover_image_url: string;
  /** Galleria per la pagina di dettaglio */
  gallery: string[];
  colors: GlassColor[];
  /** Calibro montatura, es. "52-20" */
  size: string;
  montatura: string;
  lenti: string;
  geofit: string;
  description: string;
}

const U = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80`;

export const GLASSES_MOCK: Glass[] = [
  {
    id: 'phantom-noir',
    name: 'Phantom Noir',
    brand: 'Balsi Black Series',
    price: 289,
    category: 'sole',
    collezione: 'uomo',
    image_url: U('photo-1511499767150-a48a237f0083'),
    hover_image_url: U('photo-1556306535-0f09a537f0a3'),
    gallery: [
      U('photo-1511499767150-a48a237f0083'),
      U('photo-1556306535-0f09a537f0a3'),
      U('photo-1473496169904-658ba7c44d8a'),
    ],
    colors: [
      { name: 'Lucido Nero', swatch: '#1a1a1a', image: U('photo-1511499767150-a48a237f0083') },
      { name: 'Tartaruga', swatch: '#6b4a2b', image: U('photo-1473496169904-658ba7c44d8a') },
      { name: 'Blu Notte', swatch: '#1e3a5f', image: U('photo-1556306535-0f09a537f0a3') },
    ],
    size: '52-20',
    montatura: 'Acetato nero lucido',
    lenti: 'Grigio sfumato — categoria 3',
    geofit: 'Ponte standard',
    description:
      'Una silhouette squadrata e decisa in acetato italiano, pensata per chi cerca un carattere forte. Lenti polarizzate per il massimo comfort visivo.',
  },
  {
    id: 'aviator-legend',
    name: 'Aviator Legend',
    brand: 'Balsi Gold Edition',
    price: 219,
    category: 'sole',
    collezione: 'uomo',
    image_url: U('photo-1572635196237-14b3f281503f'),
    hover_image_url: U('photo-1473496169904-658ba7c44d8a'),
    gallery: [
      U('photo-1572635196237-14b3f281503f'),
      U('photo-1473496169904-658ba7c44d8a'),
      U('photo-1577803645773-f96470509666'),
    ],
    colors: [
      { name: 'Oro / Verde G-15', swatch: '#c9a227', image: U('photo-1572635196237-14b3f281503f') },
      { name: 'Canna di Fucile', swatch: '#4b4f54', image: U('photo-1473496169904-658ba7c44d8a') },
    ],
    size: '58-14',
    montatura: 'Metallo oro spazzolato',
    lenti: 'Verde G-15 — categoria 3',
    geofit: 'Naselli regolabili',
    description:
      'Il classico intramontabile rivisitato. Montatura in metallo leggero con naselli regolabili e lenti verde G-15 ad alto contrasto.',
  },
  {
    id: 'geo-frame',
    name: 'Geo Frame',
    brand: 'Balsi Studio',
    price: 175,
    category: 'vista',
    collezione: 'donna',
    image_url: U('photo-1574258495973-f010dfbb5371'),
    hover_image_url: U('photo-1620231150904-a86b9802656a'),
    gallery: [
      U('photo-1574258495973-f010dfbb5371'),
      U('photo-1620231150904-a86b9802656a'),
      U('photo-1483985988355-763728e1935b'),
    ],
    colors: [
      { name: 'Trasparente', swatch: '#d9d4cf', image: U('photo-1574258495973-f010dfbb5371') },
      { name: 'Rosa Cipria', swatch: '#d98a9a', image: U('photo-1620231150904-a86b9802656a') },
    ],
    size: '50-18',
    montatura: 'Acetato trasparente',
    lenti: 'Neutre — predisposte per gradazione',
    geofit: 'Fit universale',
    description:
      'Linee geometriche e leggerezza per un look contemporaneo. Predisposta per lenti da vista con qualsiasi gradazione.',
  },
  {
    id: 'mini-spark',
    name: 'Mini Spark',
    brand: 'Balsi Junior',
    price: 99,
    category: 'vista',
    collezione: 'kids',
    image_url: U('photo-1517841905240-472988babdf9'),
    hover_image_url: U('photo-1561728130-afd430af0493'),
    gallery: [
      U('photo-1517841905240-472988babdf9'),
      U('photo-1561728130-afd430af0493'),
    ],
    colors: [
      { name: 'Azzurro', swatch: '#6cb6e3', image: U('photo-1517841905240-472988babdf9') },
      { name: 'Rosso', swatch: '#d64541', image: U('photo-1561728130-afd430af0493') },
    ],
    size: '44-16',
    montatura: 'Gomma flessibile anallergica',
    lenti: 'Neutre infrangibili',
    geofit: 'Aste flessibili anti-rottura',
    description:
      'Resistente, leggera e flessibile: pensata per i più piccoli. Materiali anallergici e lenti infrangibili per il gioco di ogni giorno.',
  },
];
