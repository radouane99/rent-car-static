"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Web3Forms Integration
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // You must add your Web3Forms Access Key here or via env variable
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (error) {
       console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-dark overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-white uppercase mb-8"
          >
            Elite <span className="text-gold-gradient">Concierge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Our dedicated team is available 24/7 to assist with your luxury travel needs, special requests, and long-term fleet management.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <div className="space-y-8">
            <GlassCard className="p-8 border-white/5 bg-white/5">
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-sm border border-primary/20">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">Base Command (HQ)</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Rue de la Liberté, Fès 30000<br />Morocco</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-sm border border-primary/20">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">Direct Line</h3>
                    <p className="text-white/60 text-sm leading-relaxed">+212 600-000000</p>
                    <p className="text-white/40 text-[10px] uppercase font-bold mt-1 tracking-widest">Available 24/7 for VIP Support</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-sm border border-primary/20">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">Electronic Mail</h3>
                    <p className="text-white/60 text-sm leading-relaxed">contact@benadadacars.com</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="p-8 border border-white/5 bg-primary/5 rounded-sm">
               <div className="flex items-center gap-4 mb-4">
                  <Clock className="text-primary" size={18} />
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Operational Status</span>
               </div>
               <p className="text-white/40 text-[11px] leading-relaxed">Our Fès headquarters is operational and coordinating deliveries across all major Moroccan airports and city centers.</p>
            </div>
          </div>

          {/* Form Side */}
          <GlassCard className="p-10 border-white/5">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30">
                  <Send className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase mb-4">Transmission Successful</h3>
                <p className="text-white/40 text-sm mb-8">Your message has been received by our concierge team. We will respond shortly.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="subject" value="New Inquiry - Benadada Cars" />
                <input type="hidden" name="from_name" value="Benadada Website" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                    <input 
                      name="name"
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                    <input 
                      name="email"
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Subject</label>
                  <select 
                    name="interest"
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    <option className="bg-dark">Luxury Fleet Inquiry</option>
                    <option className="bg-dark">Special Event Request</option>
                    <option className="bg-dark">Long-term Rental</option>
                    <option className="bg-dark">VIP Chauffeur Service</option>
                    <option className="bg-dark">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Your Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    placeholder="How can our concierge assist you today?"
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary text-white font-black tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl shadow-primary/10"
                >
                  {isSubmitting ? "TRANSMITTING..." : "SECURE TRANSMISSION"}
                  {!isSubmitting && <Send size={16} />}
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
