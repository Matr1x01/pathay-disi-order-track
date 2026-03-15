import { useParams, useNavigate } from "react-router-dom";
import { useOrderTracking } from "@/lib/call-api";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import OrderTimeline from "@/components/OrderTimeline";
import MapWithMarkers from "@/components/MapWithMarkers";
import TrackingInput from "@/components/TrackingInput";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Phone, MessageCircle, Info, Package, XCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const TrackOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrderTracking(orderId);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/40">
        <div className="container flex items-center gap-3 h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <Package className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-base truncate">PathayDisi</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-4xl">
        {/* Loading */}
        {isLoading && (
          <div className="space-y-4 animate-slide-up">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-6 text-center space-y-3">
              <XCircle className="h-10 w-10 text-destructive mx-auto" />
              <p className="font-semibold text-destructive">Something went wrong</p>
              <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
            </CardContent>
          </Card>
        )}

        {/* Not Found */}
        {!isLoading && !isError && !order && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-8 text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-bold">Order Not Found</h2>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  We couldn't find an order with this ID or phone number. Please double check and try again.
                </p>
                <TrackingInput className="pt-2" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Order Found */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Delivered celebration */}
            {order.status === "delivered" && (
              <div className="flex items-center justify-center gap-2 bg-primary/10 text-primary rounded-xl px-4 py-3 text-sm font-semibold">
                <CheckCircle className="h-5 w-5" />
                <span>Parcel Delivered ✓</span>
              </div>
            )}

            {/* Summary card */}
            <OrderSummaryCard order={order} />

            {/* Map + Timeline grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Map */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold">Live Map</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="h-[280px] sm:h-[320px]">
                    <MapWithMarkers
                      pickupCoords={order.pickupCoords}
                      deliveryCoords={order.deliveryCoords}
                      status={order.status}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-primary inline-block" /> Pickup</span>
                    <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-destructive inline-block" /> Delivery</span>
                    <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-accent inline-block" /> Rider</span>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold">Tracking History</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <OrderTimeline steps={order.timeline} />
                </CardContent>
              </Card>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 sm:flex-none gap-2 rounded-xl h-11">
                    <Phone className="h-4 w-4" />
                    Call Rider
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Rider</DialogTitle>
                    <DialogDescription>Rider details for your delivery</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <p className="text-sm"><span className="text-muted-foreground">Name:</span> {order.riderName}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Phone:</span> {order.riderPhone}</p>
                    <Button className="w-full gap-2" asChild>
                      <a href={`tel:${order.riderPhone}`}>
                        <Phone className="h-4 w-4" /> Call {order.riderPhone}
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 sm:flex-none gap-2 rounded-xl h-11">
                    <MessageCircle className="h-4 w-4" />
                    Chat Support
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chat Support</DialogTitle>
                    <DialogDescription>We're here to help</DialogDescription>
                  </DialogHeader>
                  <div className="text-center py-6 space-y-2">
                    <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Chat support coming soon. Call us at <strong>09612-000000</strong></p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 sm:flex-none gap-2 rounded-xl h-11">
                    <Info className="h-4 w-4" />
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>Full order information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="font-mono">{order.orderId}</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Merchant</span><span>{order.merchantName}</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Weight</span><span>{order.weight}</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span>{order.createdAt}</span></div>
                    {order.codAmount && (
                      <>
                        <Separator />
                        <div className="flex justify-between"><span className="text-muted-foreground">COD Amount</span><span className="font-semibold">৳{order.codAmount.toLocaleString()}</span></div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {order.status !== "delivered" && order.status !== "cancelled" && (
                <Button
                  variant="outline"
                  disabled={order.status === "out_for_delivery"}
                  className="flex-1 sm:flex-none gap-2 rounded-xl h-11 text-destructive border-destructive/30 hover:bg-destructive/5"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel Order
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default TrackOrder;
