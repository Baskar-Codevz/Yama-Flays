const products = [
  {
    id: 15,
    name: "Royal Bridal Bangles",
    category: "Bridal",
    collection: "Wedding Collection",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.8,
    reviews: 124,
    image: "/assets/img-15.jpeg",
    bestseller: true,

    sizes: [
      { size: "2.2", stock: 10 },
      { size: "2.4", stock: 5 },
      { size: "2.6", stock: 0 },
      { size: "2.8", stock: 8 },
    ],

    description:
      "A beautiful bangle design created to complement bridal and festive looks with an elegant traditional touch.",
  },

  {
    id: 16,
    name: "Classic Stone Bangles",
    category: "Stone",
    collection: "Jewellery Collection",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.7,
    reviews: 86,
    image: "/assets/img-16.jpeg",
    bestseller: true,

    sizes: [
      { size: "2.2", stock: 6 },
      { size: "2.4", stock: 9 },
      { size: "2.6", stock: 4 },
      { size: "2.8", stock: 0 },
    ],

    description:
      "Elegant stone-detail bangles designed to add a graceful touch to traditional and occasion wear.",
  },

  {
    id: 17,
    name: "Elegant Gold Finish Bangles",
    category: "Gold Finish",
    collection: "Jewellery Collection",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    rating: 4.9,
    reviews: 64,
    image: "/assets/img-17.jpeg",
    bestseller: true,

    sizes: [
      { size: "2.2", stock: 7 },
      { size: "2.4", stock: 0 },
      { size: "2.6", stock: 6 },
      { size: "2.8", stock: 4 },
    ],

    description:
      "A sophisticated gold-finish bangle design that brings a refined look to festive and special occasions.",
  },

  {
    id: 18,
    name: "Traditional Red Bangles",
    category: "Traditional",
    collection: "Festival Collection",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.6,
    reviews: 48,
    image: "/assets/img-18.jpeg",
    bestseller: true,

    sizes: [
      { size: "2.2", stock: 12 },
      { size: "2.4", stock: 8 },
      { size: "2.6", stock: 5 },
      { size: "2.8", stock: 3 },
    ],

    description:
      "A classic red bangle design inspired by traditional styling and suitable for festive occasions.",
  },

  {
    id: 19,
    name: "Elegant Pearl Bangles",
    category: "Pearl",
    collection: "Jewellery Collection",
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    rating: 4.8,
    reviews: 52,
    image: "/assets/img-19.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 5 },
      { size: "2.4", stock: 7 },
      { size: "2.6", stock: 0 },
      { size: "2.8", stock: 6 },
    ],

    description:
      "A delicate pearl-inspired bangle design for a graceful and elegant appearance.",
  },

  {
    id: 20,
    name: "Festive Designer Bangles",
    category: "Designer",
    collection: "Festival Collection",
    price: 1699,
    originalPrice: 2099,
    discount: 19,
    rating: 4.7,
    reviews: 41,
    image: "/assets/img-20.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 4 },
      { size: "2.4", stock: 6 },
      { size: "2.6", stock: 8 },
      { size: "2.8", stock: 0 },
    ],

    description:
      "A stylish designer bangle created to complement festive outfits and special occasions.",
  },

  {
    id: 21,
    name: "Classic Green Bangles",
    category: "Traditional",
    collection: "Festival Collection",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.6,
    reviews: 37,
    image: "/assets/img-21.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 8 },
      { size: "2.4", stock: 5 },
      { size: "2.6", stock: 0 },
      { size: "2.8", stock: 7 },
    ],

    description:
      "A classic green bangle design that adds a beautiful traditional touch to your collection.",
  },

  {
    id: 22,
    name: "Golden Stone Bangles",
    category: "Stone",
    collection: "Jewellery Collection",
    price: 1799,
    originalPrice: 2199,
    discount: 18,
    rating: 4.8,
    reviews: 45,
    image: "/assets/img-22.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 3 },
      { size: "2.4", stock: 7 },
      { size: "2.6", stock: 5 },
      { size: "2.8", stock: 0 },
    ],

    description:
      "Beautiful stone-detail bangles with a golden finish, designed for elegant occasion wear.",
  },

  {
    id: 23,
    name: "Bridal Stone Bangles",
    category: "Bridal",
    collection: "Wedding Collection",
    price: 2299,
    originalPrice: 2799,
    discount: 18,
    rating: 4.9,
    reviews: 72,
    image: "/assets/img-23.jpeg",
    bestseller: true,

    sizes: [
      { size: "2.2", stock: 6 },
      { size: "2.4", stock: 4 },
      { size: "2.6", stock: 9 },
      { size: "2.8", stock: 0 },
    ],

    description:
      "A statement bridal bangle design featuring an elegant stone-inspired look for special celebrations.",
  },

  {
    id: 24,
    name: "Modern Gold Bangles",
    category: "Gold Finish",
    collection: "New Launch",
    price: 1399,
    originalPrice: 1699,
    discount: 18,
    rating: 4.7,
    reviews: 39,
    image: "/assets/img-24.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 5 },
      { size: "2.4", stock: 0 },
      { size: "2.6", stock: 7 },
      { size: "2.8", stock: 4 },
    ],

    description:
      "A modern gold-finish bangle design combining a classic appearance with contemporary styling.",
  },

  {
    id: 25,
    name: "Festive Red Stone Bangles",
    category: "Festive",
    collection: "Festival Collection",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 4.7,
    reviews: 34,
    image: "/assets/img-25.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 9 },
      { size: "2.4", stock: 6 },
      { size: "2.6", stock: 0 },
      { size: "2.8", stock: 5 },
    ],

    description:
      "A festive bangle design featuring rich red tones and elegant detailing for celebrations.",
  },

  {
    id: 26,
    name: "Elegant Traditional Bangles",
    category: "Traditional",
    collection: "Other Products",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 4.6,
    reviews: 29,
    image: "/assets/img-26.jpeg",
    bestseller: false,

    sizes: [
      { size: "2.2", stock: 7 },
      { size: "2.4", stock: 5 },
      { size: "2.6", stock: 4 },
      { size: "2.8", stock: 0 },
    ],

    description:
      "A timeless traditional bangle design suitable for festive outfits and everyday styling.",
  },

  {
    id: 27,
    name: "Premium Designer Bangles",
    category: "Designer",
    collection: "Top Selling",
    price: 1999,
    originalPrice: 2399,
    discount: 17,
    rating: 4.8,
    reviews: 57,
    image: "/assets/img-27.jpeg",
    bestseller: true,

    sizes: [
      { size: "2.2", stock: 4 },
      { size: "2.4", stock: 8 },
      { size: "2.6", stock: 6 },
      { size: "2.8", stock: 0 },
    ],

    description:
      "A premium designer-inspired bangle style created to add an elegant finishing touch to your look.",
  },
];

export default products;
