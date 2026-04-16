"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, query, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, X, Upload, Save, ChevronRight } from "lucide-react";
import { type Car } from "@/components/cars/CarCard";

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price_per_day: "",
    category: "Supercar",
    description: "",
    available: true,
    image: null as File | null,
  });

  useEffect(() => {
    const q = query(collection(db, "cars"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
      setCars(carList);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = editingCar?.image || "";
      
      if (formData.image) {
        const storageRef = ref(storage, `cars/${formData.image.name}`);
        const snapshot = await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const carData = {
        name: formData.name,
        price_per_day: Number(formData.price_per_day),
        category: formData.category,
        description: formData.description,
        available: formData.available,
        image: imageUrl,
      };

      if (editingCar) {
        await updateDoc(doc(db, "cars", editingCar.id), carData);
      } else {
        await addDoc(collection(db, "cars"), carData);
      }
      
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving car. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price_per_day: "", category: "Supercar", description: "", available: true, image: null });
    setEditingCar(null);
    setIsModalOpen(false);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      price_per_day: car.price_per_day.toString(),
      category: car.category,
      description: car.description,
      available: car.available,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to decommission this vehicle?")) {
      await deleteDoc(doc(db, "cars", id));
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">
             Fleet <span className="text-primary">Manager</span>
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Manage your luxury inventory.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Vehicle
        </Button>
      </header>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car) => (
          <GlassCard key={car.id} className="group p-0 overflow-hidden relative border-white/5">
             <div className="aspect-video relative">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                   <button onClick={() => handleEdit(car)} className="p-2 glass rounded-sm hover:text-primary"><Edit2 size={14} /></button>
                   <button onClick={() => handleDelete(car.id)} className="p-2 glass rounded-sm hover:text-red-500"><Trash2 size={14} /></button>
                </div>
             </div>
             <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-white font-bold uppercase tracking-tight italic">{car.name}</h3>
                   <span className="text-primary font-bold text-sm">${car.price_per_day}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                   <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{car.category}</span>
                   <span className="w-1 h-1 bg-white/10 rounded-full" />
                   <span className={cn("text-[9px] uppercase tracking-widest font-black", car.available ? "text-green-500" : "text-red-500")}>
                      {car.available ? "Ready" : "In Use"}
                   </span>
                </div>
             </div>
          </GlassCard>
        ))}
      </div>

      {/* Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={resetForm} />
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-full max-w-2xl relative z-10"
           >
              <GlassCard className="p-10 gold-border shadow-2xl">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-display font-black text-white italic uppercase">
                       {editingCar ? "Declassify & Edit" : "Deploy New Asset"}
                    </h2>
                    <button onClick={resetForm} className="text-white/40 hover:text-white"><X size={24} /></button>
                 </div>

                 <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Model Name</label>
                          <input 
                            required 
                            className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-primary" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Price / Day ($)</label>
                          <input 
                            required type="number"
                            className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-primary" 
                            value={formData.price_per_day} 
                            onChange={e => setFormData({...formData, price_per_day: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Category</label>
                          <select 
                            className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none"
                            value={formData.category} 
                            onChange={e => setFormData({...formData, category: e.target.value})}
                          >
                             <option value="Supercar">Supercar</option>
                             <option value="Luxury">Luxury</option>
                             <option value="Sport">Sport</option>
                             <option value="SUV">SUV</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Asset Description</label>
                           <textarea 
                             rows={4}
                             className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-primary resize-none" 
                             value={formData.description} 
                             onChange={e => setFormData({...formData, description: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Visual Asset (Image)</label>
                           <div className="relative group">
                              <input 
                                type="file" 
                                className="hidden" 
                                id="image-upload" 
                                accept="image/*"
                                onChange={e => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})}
                              />
                              <label htmlFor="image-upload" className="w-full h-24 border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                 <Upload size={20} className="text-white/20 group-hover:text-primary" />
                                 <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold group-hover:text-white">
                                    {formData.image ? formData.image.name : "Select High-Res Image"}
                                 </span>
                              </label>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                           <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Operational Status</label>
                           <button 
                             type="button"
                             onClick={() => setFormData({...formData, available: !formData.available})}
                             className={cn(
                                "relative w-12 h-6 rounded-full transition-colors duration-500",
                                formData.available ? "bg-primary" : "bg-white/10"
                             )}
                           >
                              <div className={cn(
                                "absolute top-1 left-1 w-4 h-4 bg-dark rounded-full transition-transform duration-500",
                                formData.available && "translate-x-6"
                              )} />
                           </button>
                           <span className={cn("text-[9px] uppercase font-black tracking-widest", formData.available ? "text-primary" : "text-white/30")}>
                              {formData.available ? "Active" : "Inactive"}
                           </span>
                        </div>
                    </div>

                    <div className="col-span-2 pt-6">
                       <Button type="submit" disabled={loading} className="w-full flex items-center gap-3 h-14 uppercase font-black tracking-[0.2em] text-xs">
                          {loading ? "Initializing..." : <><Save size={18} /> Secure Transaction & Save</>}
                       </Button>
                    </div>
                 </form>
              </GlassCard>
           </motion.div>
        </div>
      )}
    </div>
  );
}

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
