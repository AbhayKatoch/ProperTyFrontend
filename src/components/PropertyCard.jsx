import { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Carousel from "../components/ui/carousel";
import { MapPin, Trash2, Eye, Power } from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Textarea } from "../components/ui/textarea";

export default function PropertyCard({ property, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(property);
  const [saving, setSaving] = useState(false);
  const isActive = property.status === "active";

  const showField = (label, value, suffix = "") => {
    if (!value && value !== 0) return null;
    return (
      <p className="text-sm text-gray-700">
        <strong>{label}:</strong> {value} {suffix}
      </p>
    );
  };

  // ✅ Toggle status (active/disabled)
  const handleToggleStatus = async () => {
    try {
      const newStatus = isActive ? "disabled" : "active";
      await api.patch(`properties/${property.id}/`, { status: newStatus });
      toast.success(`Property ${newStatus === "active" ? "activated" : "disabled"}`);
      onUpdate?.();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // ✅ Delete with confirmation
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await api.delete(`properties/${property.id}/`);
      toast.success("Property deleted successfully.");
      onUpdate?.();
    } catch {
      toast.error("Failed to delete property.");
    }
  };

  // ✅ Save edits to backend
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
      toast.success("Property updated successfully!");
      setEditData(response.data);
      onUpdate?.(); // Refresh Dashboard data
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update property.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 bg-white p-0">
          <CardHeader className="p-0 relative">
            {property.media?.length > 0 ? (
              <Carousel
                items={property.media.map((m) => ({
                  type: m.media_type,
                  url: m.storage_url,
                }))}
              />
            ) : (
              <img
                src="https://via.placeholder.com/400x300?text=No+Image"
                alt="placeholder"
                className="h-52 w-full object-cover bg-gray-100"
              />
            )}

            <span
              className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isActive ? "Active" : "Disabled"}
            </span>
          </CardHeader>

          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {property.title || "Untitled Property"}
              </h3>
              <div className="flex items-center text-sm text-gray-500 gap-1 mt-1">
                <MapPin size={14} /> {property.city || "Unknown"} •{" "}
                {property.bhk ? `${property.bhk} BHK` : "N/A"}
              </div>
            </div>

            {property.price && (
              <div className="text-xl font-bold text-sky-600">
                ₹ {Number(property.price).toLocaleString()}
              </div>
            )}

            {(property.description_beautified ||
              property.description_raw) && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {property.description_beautified ||
                  property.description_raw}
              </p>
            )}

            <div className="flex justify-between items-center pt-3 border-t mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setOpen(true)}
              >
                <Eye size={14} /> View
              </Button>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isActive ? "secondary" : "default"}
                  className="flex items-center gap-1"
                  onClick={handleToggleStatus}
                >
                  <Power size={14} />
                  {isActive ? "Disable" : "Activate"}
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={handleDelete}
                >
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 🏠 Overlay for Property Details + Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editData.title || "Property Details"}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-3">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-4">
              {property.media?.length > 0 && (
                <Carousel
                  items={property.media.map((m) => ({
                    type: m.media_type,
                    url: m.storage_url,
                  }))}
                />
              )}

              <div className="grid grid-cols-2 gap-3 mt-3">
                {showField("City", property.city)}
                {showField("Locality", property.locality)}
                {showField("BHK", property.bhk)}
                {showField("Bathrooms", property.bathrooms)}
                {showField("Area", property.area_sqft, "sqft")}
                {showField(
                  "Floor",
                  property.floor &&
                    `${property.floor} / ${property.total_floors || "—"}`
                )}
                {showField("Furnishing", property.furnishing)}
                {showField("Property Age", property.age_of_property, "yrs")}
                {showField("Sale/Rent", property.sale_or_rent)}
                {showField("Price", property.price, "₹")}
                {showField("Maintenance", property.maintenance, "₹")}
                {showField("Deposit", property.deposit, "₹")}
              </div>

              {property.description_beautified ||
              property.description_raw ? (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Description</h3>
                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                    {property.description_beautified ||
                      property.description_raw}
                  </p>
                </div>
              ) : null}
            </TabsContent>

            {/* Edit Tab */}
            <TabsContent value="edit" className="space-y-3 mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editData.title || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={editData.city || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={editData.price || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>BHK</Label>
                  <Input
                    type="number"
                    value={editData.bhk || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, bhk: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Area (sqft)</Label>
                  <Input
                    type="number"
                    value={editData.area_sqft || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, area_sqft: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Locality</Label>
                  <Input
                    value={editData.locality || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, locality: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={editData.description_beautified || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description_beautified: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="mt-2 bg-sky-600 text-white hover:bg-sky-700"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
