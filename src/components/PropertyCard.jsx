"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { MapPin, Trash2, Eye, Power, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { CheckCircle, XCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"; // ✅ uses shadcn for confirmation dialogs

export default function PropertyCard({ property, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState(property);
  const isActive = property.status === "active";

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const showField = (label, value, suffix = "") =>
    value ? (
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-gray-900">{label}:</span> {value} {suffix}
      </p>
    ) : null;

  // ✅ Unified toast utility

const showToast = (type, message) => {
  toast.custom((t) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -10 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border border-white/30 backdrop-blur-xl 
        ${type === "delete"
          ? "bg-gradient-to-r from-rose-500/80 to-rose-400/80 text-white"
          : "bg-gradient-to-r from-sky-600/80 to-purple-600/80 text-white"
        }`}
    >
      {type === "delete" ? <XCircle size={20} /> : <CheckCircle size={20} />}
      <div>
        <p className="font-semibold leading-none">{message}</p>
        <p className="text-sm opacity-80 mt-0.5">
          {type === "delete" ? "Property removed permanently." : "Action successful!"}
        </p>
      </div>
    </motion.div>
  ), { duration: 3000 });
};


  // ✅ Toggle active/disabled status
  const handleToggleStatus = async () => {
    const newStatus = isActive ? "disabled" : "active";
    try {
      await api.patch(`properties/${property.id}/`, { status: newStatus });
      onUpdate?.();
      showToast(
        "status",
        `${property.title || "Property"} has been ${newStatus}.`
      );
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // ✅ Delete property
  const handleDelete = async () => {
    try {
      await api.delete(`properties/${property.id}/`);
      onUpdate?.();
      showToast("delete", `${property.title || "Property"} has been deleted.`);
    } catch {
      toast.error("Failed to delete property.");
    }
  };

  // ✅ Save property edits
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title: editData.title,
        city: editData.city,
        price: editData.price,
        bhk: editData.bhk,
        area_sqft: editData.area_sqft,
        locality: editData.locality,
        description_beautified: editData.description_beautified,
      };
      const response = await api.patch(`properties/${property.id}/`, payload);
      setEditData(response.data);
      onUpdate?.();
      toast.success("Property updated successfully!");
      setOpen(false);
    } catch {
      toast.error("Failed to update property.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* === Property Card === */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-0 shadow-md hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
          {/* Image Carousel */}
          <CardHeader className="p-0 relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {property.media?.length > 0 ? (
                  property.media.map((m, idx) => (
                    <div key={idx} className="flex-[0_0_100%] relative">
                      <motion.img
                        src={m.storage_url}
                        alt=""
                        className="w-full h-52 object-cover rounded-t-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex-[0_0_100%] h-52 flex items-center justify-center bg-gray-100 rounded-t-2xl">
                    <Home className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {property.media?.length > 1 && (
              <>
                <Button
                  size="icon"
                  onClick={scrollPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-sm rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={scrollNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-sm rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
                isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
              }`}
            >
              {isActive ? "Active" : "Disabled"}
            </span>
          </CardHeader>

          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-lg text-gray-800 truncate">
              {property.title || "Untitled Property"}
            </h3>
            <div className="flex items-center text-sm text-gray-500 gap-1 mt-1">
              <MapPin size={14} className="text-sky-600" />
              {property.locality || "Unknown"}, {property.city || ""}
            </div>

            {property.price && (
              <div className="text-xl font-bold text-sky-700">
                ₹ {Number(property.price).toLocaleString()}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t mt-3">
              <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
                <Eye size={14} /> View
              </Button>

              <div className="flex gap-2">
                {/* ✅ Confirmation Dialog for Status */}
                <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button
      size="sm"
      variant={isActive ? "secondary" : "default"}
      className={`flex items-center gap-1 rounded-md transition-all duration-300 ${
        isActive
          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md"
      }`}
    >
      <Power size={14} />
      {isActive ? "Disable" : "Activate"}
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        {isActive ? "Disable Property?" : "Activate Property?"}
      </AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to {isActive ? "disable" : "activate"}{" "}
        <strong>{property.title}</strong>?
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleToggleStatus}
        className={`rounded-md text-white transition-all duration-300 shadow-sm hover:shadow-md ${
          isActive
            ?  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        }`}
      >
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


                {/* ✅ Confirmation Dialog for Delete */}
                <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button
      size="sm"
      variant="destructive"
      className="flex items-center gap-1 rounded-md bg-gradient-to-r from-rose-600 to-rose-500 text-white hover:from-rose-700 hover:to-rose-600 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <Trash2 size={14} /> Delete
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Property?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. It will permanently delete{" "}
        <strong>{property.title}</strong>.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleDelete}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-md shadow-sm hover:shadow-md"
      >
        Confirm Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
