import { Order, statusMeta } from "@/lib/tracking-data";
import StatusBadge from "./StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Store, MapPin, Clock, Banknote } from "lucide-react";

interface OrderSummaryCardProps {
  order: Order;
}

const OrderSummaryCard = ({ order }: OrderSummaryCardProps) => {
  return (
    <Card className="glass-card-hover border-0 shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                {order.orderId}
              </span>
              <StatusBadge status={order.status} size="lg" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Store className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium truncate">{order.merchantName}</span>
            </div>
          </div>

          {order.codAmount && (
            <div className="flex items-center gap-1.5 text-sm font-semibold bg-warning/10 text-warning px-3 py-1.5 rounded-lg shrink-0">
              <Banknote className="h-4 w-4" />
              <span>৳{order.codAmount.toLocaleString()} COD</span>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="block font-medium text-foreground">Pickup</span>
              {order.pickupAddress}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
            <div>
              <span className="block font-medium text-foreground">Delivery</span>
              {order.deliveryAddress}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="block font-medium text-foreground">Estimated</span>
              {order.estimatedDelivery}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
