'use client';

import { motion } from 'framer-motion';
import { features } from '@/data/products';

export default function FeatureSection() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] via-[#2D1810] to-[#1A0F0A] opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-center text-[#F5E6D3] mb-20"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Features */}
          <div className="space-y-8">
            {features.filter(f => f.position === 'left').map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-[#3D2820]/60 backdrop-blur-sm p-6 rounded-xl border border-[#5A4034]/50 hover:border-[#4F9C8F]/50 transition-colors duration-300"
              >
                <h3 className="text-2xl font-['Playfair_Display'] font-semibold text-[#F5E6D3] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#C9B8A0] font-['Inter'] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center: Coffee Cup Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-[#4F9C8F]/20 to-[#D4A574]/20 rounded-full blur-3xl"
              />
              <img
                src="/coffee/cup-centered.png"
                alt="Premium Coffee Cup"
                className="relative z-10 w-80 h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Right Features */}
          <div className="space-y-8">
            {features.filter(f => f.position === 'right').map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-[#3D2820]/60 backdrop-blur-sm p-6 rounded-xl border border-[#5A4034]/50 hover:border-[#4F9C8F]/50 transition-colors duration-300"
              >
                <h3 className="text-2xl font-['Playfair_Display'] font-semibold text-[#F5E6D3] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#C9B8A0] font-['Inter'] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
