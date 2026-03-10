'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { coffeeProducts } from '@/data/products';

export default function ProductShowcase() {
  return (
    <section className="py-24 px-4 md:px-8 relative">
      {/* Coffee Splash Banner */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-64 mb-16 rounded-3xl overflow-hidden max-w-7xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2418] via-[#4D3428] to-[#3D2418]" />
        <img
          src="/coffee/splash-banner.jpg"
          alt="Coffee Splash"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />

        {/* Floating Coffee Beans */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: i * 0.3
            }}
            className="absolute w-8 h-8 opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.random() * 40}%`
            }}
          >
            <img src="/coffee/bean.png" alt="Coffee Bean" className="w-full h-full object-contain" />
          </motion.div>
        ))}

        {/* Banner Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-amber-50 drop-shadow-2xl">
              Crafted with Passion
            </h3>
            <p className="text-amber-100/70 text-lg mt-2 font-['Inter']">
              Every cup tells a story
            </p>
          </div>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-center text-[#F5E6D3] mb-16"
        >
          Our Signature Blends
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffeeProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
