"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { 
  collection, query, onSnapshot, doc, 
  deleteDoc, addDoc, updateDoc, orderBy 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Plus, Edit2, Trash2, X, Upload, Save, 
  Search, Filter, MoreHorizontal, Check, AlertCircle 
} from "lucide-react";
import { type Car } from "@/components/cars/CarCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price_per_day: "",
    category: "Supercar",
    description: "",
    available: true,
    image: null as File | null,
    imageURL: "",
    imagePreview: "" as string,
  });

  useEffect(() => {
    const q = query(collection(db, "cars"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
      setCars(carList);
    });
    return () => unsubscribe();
  }, []);

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = editingCar?.image || "";
      
      if (formData.image) {
        try {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
          
          const uploadData = new FormData();
          uploadData.append("file", formData.image);
          uploadData.append("upload_preset", uploadPreset!);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: uploadData }
          );

          if (!response.ok) throw new Error("Cloudinary Upload Failed");
          
          const data = await response.json();
          imageUrl = data.secure_url;
        } catch (uploadErr: any) {
          console.error("Upload Error:", uploadErr);
          throw new Error("Direct Upload failed. Check your Cloudinary settings.");
        }
      } else if (formData.imageURL) {
        imageUrl = formData.imageURL;
      }

      const carData = {
        name: formData.name,
        price_per_day: Number(formData.price_per_day),
        category: formData.category,
        description: formData.description,
        available: formData.available,
        image: imageUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingCar) {
        await updateDoc(doc(db, "cars", editingCar.id), carData);
      } else {
        await addDoc(collection(db, "cars"), { ...carData, createdAt: new Date().toISOString() });
      }
      
      resetForm();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Critical error during data sync.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price_per_day: "", category: "Supercar", description: "", available: true, image: null, imageURL: "", imagePreview: "" });
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
      imageURL: car.image,
      imagePreview: car.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("🚨 WARNING: This action will permanently decommission this asset from the global registry. Proceed?")) {
      await deleteDoc(doc(db, "cars", id));
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Registry Active</span>
           </div>
           <h1 className="text-5xl font-display font-black text-gray-900 uppercase italic tracking-tighter">
              FLEET <span className="text-primary">INVENTORY</span>
           </h1>
           <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Global vehicle asset management protocol.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="h-14 px-8 flex items-center gap-3 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          <span className="uppercase font-black text-xs tracking-widest">Commission Asset</span>
        </Button>
      </header>

      {/* Control Bar */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center border-gray-200 bg-white shadow-sm">
         <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search via name, category or ID..."
              className="w-full bg-white border border-gray-200 rounded-none pl-12 pr-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-300"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-grow md:flex-none border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 px-6 py-3 text-[10px] items-center gap-2 uppercase font-bold tracking-widest flex justify-center transition-colors">
               <Filter size={14} /> Filter
            </button>
            <button className="flex-grow md:flex-none border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 px-6 py-3 text-[10px] items-center gap-2 uppercase font-bold tracking-widest flex justify-center transition-colors">
               <MoreHorizontal size={14} /> Actions
            </button>
         </div>
      </GlassCard>

      {/* Modern Asset Table */}
      <GlassCard className="overflow-hidden border-gray-200 bg-white shadow-sm p-0">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                     <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-gray-500">Asset</th>
                     <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-gray-500">Configuration</th>
                     <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-gray-500">Valuation</th>
                     <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-gray-500">Status</th>
                     <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 text-right">Operations</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {filteredCars.map((car) => (
                    <motion.tr 
                      layout
                      key={car.id} 
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-10 bg-dark overflow-hidden rounded-sm gold-border shrink-0">
                                <img src={car.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div>
                                <p className="text-white font-black uppercase text-xs italic tracking-tight">{car.name}</p>
                                <p className="text-white/20 text-[9px] uppercase tracking-tighter">ID: {car.id.slice(0, 8)}...</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="bg-white/5 text-white/60 text-[9px] px-3 py-1 uppercase font-bold tracking-widest rounded-full">{car.category}</span>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-primary font-black text-sm">${car.price_per_day}<span className="text-[10px] text-white/30 italic font-normal"> /day</span></p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={cn("w-1.5 h-1.5 rounded-full", car.available ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500")} />
                             <span className={cn("text-[10px] uppercase font-black tracking-widest", car.available ? "text-green-600" : "text-red-500/70")}>
                                {car.available ? "Ready" : "In Service"}
                             </span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                               onClick={() => handleEdit(car)}
                               className="p-3 bg-white border border-gray-200 rounded-sm text-gray-400 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                             >
                               <Edit2 size={16} />
                             </button>
                             <button 
                               onClick={() => handleDelete(car.id)}
                               className="p-3 bg-white border border-gray-200 rounded-sm text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
            {filteredCars.length === 0 && (
              <div className="py-20 text-center">
                 <p className="text-gray-400 uppercase tracking-[0.5em] text-[10px] font-bold italic">No Assets Located in Current Range</p>
              </div>
            )}
         </div>
      </GlassCard>

      {/* Global Commissioning Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
               onClick={resetForm} 
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="w-full max-w-3xl relative z-10"
             >
                <GlassCard className="p-12 border-gray-200 bg-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-10" />
                   
                   <div className="flex justify-between items-start mb-12">
                      <div>
                        <h2 className="text-3xl font-display font-black text-gray-900 italic uppercase tracking-tighter">
                           {editingCar ? "Update Node" : "Asset Commissioning"}
                        </h2>
                        <p className="text-primary text-[10px] uppercase font-bold tracking-[0.3em] mt-2">Protocol: {editingCar ? "PATCH_ASSET" : "POST_NEW_VHEICLE"}</p>
                      </div>
                      <button onClick={resetForm} className="p-2 border border-gray-200 bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"><X size={24} /></button>
                   </div>

                   <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                         <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Model Identification</label>
                            <input 
                              required 
                              placeholder="e.g. Aventador SVJ"
                              className="w-full bg-white border border-gray-200 p-4 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-none placeholder:text-gray-300" 
                              value={formData.name} 
                              onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Daily Rate ($)</label>
                               <input 
                                 required type="number"
                                 className="w-full bg-white border border-gray-200 p-4 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-none placeholder:text-gray-300" 
                                 value={formData.price_per_day} 
                                 onChange={e => setFormData({...formData, price_per_day: e.target.value})}
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Category</label>
                               <select 
                                 className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none rounded-none cursor-pointer"
                                 value={formData.category} 
                                 onChange={e => setFormData({...formData, category: e.target.value})}
                               >
                                  <option value="Supercar">Supercar</option>
                                  <option value="Luxury">Luxury Sedan</option>
                                  <option value="Sport">Sport Coupe</option>
                                  <option value="SUV">Luxury SUV</option>
                               </select>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Asset Parameters (Description)</label>
                            <textarea 
                              rows={5}
                              placeholder="Describe the vehicle unique specifications..."
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-primary resize-none rounded-none" 
                              value={formData.description} 
                              onChange={e => setFormData({...formData, description: e.target.value})}
                            />
                         </div>
                      </div>

                      <div className="space-y-8">
                          <div className="space-y-6">
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Visual Hash (Direct Secure Upload)</label>
                                <div className="relative group">
                                   <input 
                                     type="file" 
                                     className="hidden" 
                                     id="image-upload" 
                                     accept="image/*"
                                     onChange={handleImageChange}
                                   />
                                   <label htmlFor="image-upload" className="w-full aspect-video border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-3 cursor-pointer group-hover:border-primary/50 group-hover:bg-primary/5 transition-all overflow-hidden relative">
                                      {formData.imagePreview ? (
                                        <>
                                           <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                                              <Upload size={24} className="text-white mb-2" />
                                              <span className="text-[10px] uppercase font-black tracking-widest text-white">Swap Visual Asset</span>
                                           </div>
                                        </>
                                      ) : (
                                        <>
                                           <div className="p-4 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-primary/50 transition-colors">
                                              <Upload size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
                                           </div>
                                           <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold group-hover:text-primary transition-colors">Select Visual Hash</span>
                                        </>
                                      )}
                                   </label>
                                </div>
                             </div>
                             {/* Optional URL hidden by default for clean UI */}
                             <details className="cursor-pointer">
                                <summary className="text-[8px] uppercase text-gray-400 font-bold hover:text-gray-600 transition-colors">Advanced: Use Image URL</summary>
                                <input 
                                  placeholder="https://..."
                                  className="mt-2 w-full bg-white border border-gray-200 p-2 text-[10px] text-gray-600 focus:outline-none focus:border-primary transition-all rounded-none font-mono placeholder:text-gray-300" 
                                  value={formData.imageURL} 
                                  onChange={e => setFormData({...formData, imageURL: e.target.value, imagePreview: e.target.value})}
                                />
                             </details>
                          </div>

                          <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-sm">
                             <div>
                                <p className="text-[10px] uppercase font-black text-gray-900 tracking-widest mb-1">Operational Protocol</p>
                                <p className="text-[8px] uppercase text-gray-500 font-bold">Declare asset as ready for mission</p>
                             </div>
                             <button 
                               type="button"
                               onClick={() => setFormData({...formData, available: !formData.available})}
                               className={cn(
                                  "relative w-14 h-7 rounded-full transition-all duration-500",
                                  formData.available ? "bg-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "bg-gray-300"
                               )}
                             >
                                <div className={cn(
                                  "absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-500 flex items-center justify-center shadow-sm",
                                  formData.available ? "translate-x-7" : "translate-x-0"
                                )}>
                                   {formData.available ? <Check size={10} className="text-primary" /> : <X size={10} className="text-gray-400" />}
                                </div>
                             </button>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-sm">
                             <AlertCircle size={16} className="text-primary shrink-0" />
                             <p className="text-[8px] uppercase font-bold text-primary leading-relaxed">Ensure all technical data is validated before global sync.</p>
                          </div>
                      </div>

                      <div className="md:col-span-2 pt-6">
                         <Button type="submit" disabled={loading} className="w-full h-16 flex items-center justify-center gap-4 group bg-primary text-white hover:bg-primary-dark shadow-lg">
                            {loading ? (
                              <div className="flex items-center gap-3">
                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                 <span className="uppercase font-black text-xs tracking-widest">Synchronizing...</span>
                              </div>
                            ) : (
                              <>
                                <Save size={20} className="group-hover:scale-110 transition-transform" /> 
                                <span className="uppercase font-black text-xs tracking-widest">Initialize Global Data & Save Asset</span>
                              </>
                            )}
                         </Button>
                      </div>
                   </form>
                </GlassCard>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
