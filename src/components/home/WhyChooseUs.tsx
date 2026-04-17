"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Headset, Zap } from "lucide-react";

const REASONS = [
  {
    title: "Qualité Premium",
    description: "Chaque véhicule subit une inspection complète et un entretien rigoureux pour garantir votre sécurité, votre confort et votre tranquillité d'esprit.",
    icon: ShieldCheck,
  },
  {
    title: "Assistance 24/7",
    description: "Notre équipe d'assistance dévouée est disponible 24 heures sur 24 pour vous aider avec toutes vos questions ou préoccupations pendant votre location.",
    icon: Headset,
  },
  {
    title: "Meilleur Rapport Qualité/Prix",
    description: "Prix transparents sans frais cachés. Obtenez des services de location de voitures premium à des tarifs compétitifs avec une valeur exceptionnelle.",
    icon: Zap,
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black text-dark mb-6 uppercase"
          >
            Pourquoi Choisir <span className="text-primary">Benadada Cars</span> ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-base leading-relaxed font-medium"
          >
            Nous nous engageons à fournir une expérience de location de voiture inégalée avec un service premium à chaque étape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group p-10 bg-white hover:bg-dark transition-all duration-700 rounded-[2.5rem] border border-gray-100 hover:border-dark hover:shadow-2xl hover:shadow-primary/20 text-center"
            >
              <div className="w-20 h-20 bg-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/20">
                <reason.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-dark group-hover:text-white mb-6 uppercase tracking-wider">
                {reason.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed font-medium">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
