import toast from "react-hot-toast";
import { CheckCircle, Trash2, Power } from "lucide-react";

export const showToast = (type, title) => {
  const isDelete = type === "delete";
  const isDisable = type === "disable";
  const isActivate = type === "activate";

  const bgGradient = isDelete
    ? "linear-gradient(135deg, #ef4444, #dc2626)"
    : isDisable
    ? "linear-gradient(135deg, #f59e0b, #d97706)"
    : "linear-gradient(135deg, #2563eb, #7c3aed)";

  const Icon = isDelete ? Trash2 : isDisable ? Power : CheckCircle;
  const message = isDelete
    ? `${title} has been deleted successfully.`
    : isDisable
    ? `${title} has been disabled.`
    : `${title} is now active.`;

  toast.custom(
    (t) => (
      <div
        style={{
          background: bgGradient,
          color: "white",
          padding: "14px 18px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minWidth: "280px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          transform: t.visible
            ? "translateY(0) scale(1)"
            : "translateY(-10px) scale(0.95)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex items-center justify-center bg-white/20 rounded-full p-2">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-sm">Property {type === "delete" ? "Deleted" : type === "disable" ? "Disabled" : "Activated"}</p>
          <p className="text-xs opacity-90">{message}</p>
        </div>
      </div>
    ),
    { duration: 3000 }
  );
};
