'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] to-[#2D1810]" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F9C8F]/20 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6"
        >
          Find the Perfect Coffee for You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-[#C9B8A0] mb-12 font-['Inter']"
        >
          Experience the art of coffee craftsmanship
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-16 py-5 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-xl font-semibold font-['Inter'] shadow-2xl hover:shadow-[#4F9C8F]/40 transition-shadow"
        >
          Explore Full Menu
        </motion.button>

        {/* Decorative Sparkle */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mt-12 text-[#D4A574] text-4xl"
        >
          ✦
        </motion.div>
      </div>
    </section>
  );
}
