import { Order, statusMeta } from "@/lib/tracking-data";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, MapPin, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: Order["status"];
  size?: "sm" | "lg";
}

const statusIcons = {
  placed: Clock,
  picked_up: Package,
  in_transit: Truck,
  out_for_delivery: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const StatusBadge = ({ status, size = "sm" }: StatusBadgeProps) => {
  const meta = statusMeta[status];
  const Icon = statusIcons[status];
  const isActive = status === "out_for_delivery" || status === "in_transit";

  return (
    <Badge
      className={cn(
        "gap-1.5 font-semibold border-0",
        meta.bgClass,
        meta.colorClass,
        size === "lg" && "px-4 py-2 text-sm",
        isActive && "animate-pulse-soft"
      )}
      variant="outline"
    >
      <Icon className={cn("shrink-0", size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5")} />
      <span>{meta.label}</span>
    </Badge>
  );
};

export default StatusBadge;
