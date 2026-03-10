export interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
}

export const coffeeProducts: CoffeeProduct[] = [
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Cappuccino is a latte made with more foam than steamed milk, often topped with cocoa powder.',
    price: '$3.50',
    rating: 4.9,
    image: '/coffee/cappuccino.jpg',
    features: ['Espresso', 'Steamed Milk', 'Foam']
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Latte is a coffee drink made with espresso and steamed milk. Rich, creamy, balanced.',
    price: '$4.00',
    rating: 5.0,
    image: '/coffee/latte.jpg',
    features: ['Espresso', 'Steamed Milk', 'Light Foam']
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Mocha is a coffee beverage where dark espresso meets rich chocolate and creamy milk.',
    price: '$4.50',
    rating: 4.7,
    image: '/coffee/mocha.jpg',
    features: ['Espresso', 'Chocolate', 'Steamed Milk']
  }
];

export interface FeatureHighlight {
  title: string;
  description: string;
  position: 'left' | 'right';
}

export const features: FeatureHighlight[] = [
  {
    title: 'High-Quality Beans',
    description: 'High-quality beans are a single told story about craft, dedication, and the culinary journey where every sip is unique.',
    position: 'left'
  },
  {
    title: 'Individual Approach',
    description: 'Most visitors expect coffee culture today is meticulously designed and economically managed. Individual approach.',
    position: 'right'
  },
  {
    title: 'Atmosphere of Inspiration',
    description: 'Our coffee shop embraces an atmosphere where creativity, warmth, and exceptional flavor converge in every visit.',
    position: 'left'
  },
  {
    title: 'Professional Baristas',
    description: 'Professional Baristas are server professional and deliver rich experiences with every custom coffee crafted perfectly.',
    position: 'right'
  }
];
