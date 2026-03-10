'use client';

import { motion } from 'framer-motion';
import { CoffeeProduct } from '@/data/products';

interface ProductCardProps {
  product: CoffeeProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-[#3D2820]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#5A4034] hover:border-[#4F9C8F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#4F9C8F]/20"
    >
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#FFD700] text-lg">★</span>
        <span className="text-[#F5E6D3] font-semibold text-sm">{product.rating}</span>
      </div>

      {/* Coffee Image */}
      <div className="w-full h-56 bg-[#2D1810] rounded-xl mb-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Title & Description */}
      <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-3">
        {product.name}
      </h3>
      <p className="text-sm text-[#C9B8A0] mb-5 line-clamp-2 font-['Inter']">
        {product.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-5">
        {product.features.map((feature, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-[#2D1810] text-[#C9B8A0] rounded-full border border-[#5A4034]/50"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-[#F5E6D3] font-['Inter']">
          {product.price}
        </span>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] flex items-center justify-center hover:shadow-lg hover:shadow-[#4F9C8F]/40 transition-shadow"
        >
          <span className="text-white text-2xl font-bold">+</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
