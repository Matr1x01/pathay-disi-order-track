export type OrderStatus = "placed" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "cancelled";

export interface TimelineStep {
  id: string;
  status: OrderStatus;
  title: string;
  titleBn: string;
  description: string;
  location: string;
  timestamp: string | null;
  completed: boolean;
  active: boolean;
}

export interface Order {
  orderId: string;
  merchantName: string;
  merchantLogo?: string;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  statusLabel: string;
  statusLabelBn: string;
  codAmount: number | null;
  estimatedDelivery: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupCoords: [number, number];
  deliveryCoords: [number, number];
  riderName: string;
  riderPhone: string;
  weight: string;
  timeline: TimelineStep[];
  createdAt: string;
}

export const statusMeta: Record<OrderStatus, { label: string; labelBn: string; colorClass: string; bgClass: string }> = {
  placed: { label: "Order Placed", labelBn: "অর্ডার সম্পন্ন", colorClass: "text-status-placed", bgClass: "bg-muted" },
  picked_up: { label: "Picked Up", labelBn: "সংগ্রহ করা হয়েছে", colorClass: "text-status-picked", bgClass: "bg-accent/10" },
  in_transit: { label: "In Transit", labelBn: "পথে আছে", colorClass: "text-status-transit", bgClass: "bg-purple-50" },
  out_for_delivery: { label: "Out for Delivery", labelBn: "ডেলিভারিতে বের হয়েছে", colorClass: "text-status-out", bgClass: "bg-warning/10" },
  delivered: { label: "Delivered", labelBn: "ডেলিভারি সম্পন্ন", colorClass: "text-status-delivered", bgClass: "bg-primary/10" },
  cancelled: { label: "Cancelled", labelBn: "বাতিল", colorClass: "text-status-cancelled", bgClass: "bg-destructive/10" },
};

export const mockOrders: Record<string, Order> = {
  "JDX-240312-7891": {
    orderId: "JDX-240312-7891",
    merchantName: "Fashion House BD",
    customerName: "Rahim Uddin",
    customerPhone: "01712345678",
    status: "out_for_delivery",
    statusLabel: "Out for Delivery",
    statusLabelBn: "ডেলিভারিতে বের হয়েছে",
    codAmount: 1450,
    estimatedDelivery: "Today, 2:00 PM – 4:00 PM",
    pickupAddress: "Mirpur-10, Dhaka",
    deliveryAddress: "Dhanmondi 27, Dhaka",
    pickupCoords: [23.8069, 90.3687],
    deliveryCoords: [23.7465, 90.3760],
    riderName: "Karim Hossain",
    riderPhone: "01898765432",
    weight: "0.8 kg",
    timeline: [
      { id: "1", status: "placed", title: "Order Placed", titleBn: "অর্ডার সম্পন্ন", description: "Order confirmed by merchant", location: "Mirpur-10, Dhaka", timestamp: "Mar 11, 2026 – 9:15 PM", completed: true, active: false },
      { id: "2", status: "picked_up", title: "Picked Up", titleBn: "সংগ্রহ করা হয়েছে", description: "Parcel collected from merchant", location: "Mirpur-10, Dhaka", timestamp: "Mar 12, 2026 – 10:30 AM", completed: true, active: false },
      { id: "3", status: "in_transit", title: "In Transit", titleBn: "পথে আছে", description: "Parcel at sorting hub", location: "Uttara Hub, Dhaka", timestamp: "Mar 12, 2026 – 11:45 AM", completed: true, active: false },
      { id: "4", status: "out_for_delivery", title: "Out for Delivery", titleBn: "ডেলিভারিতে বের হয়েছে", description: "Rider is on the way to deliver", location: "Dhanmondi Area", timestamp: "Mar 12, 2026 – 1:20 PM", completed: false, active: true },
      { id: "5", status: "delivered", title: "Delivered", titleBn: "ডেলিভারি সম্পন্ন", description: "Parcel delivered successfully", location: "Dhanmondi 27, Dhaka", timestamp: null, completed: false, active: false },
    ],
    createdAt: "Mar 11, 2026",
  },
  "JDX-240310-4523": {
    orderId: "JDX-240310-4523",
    merchantName: "TechZone BD",
    customerName: "Sumaiya Akter",
    customerPhone: "01612345678",
    status: "delivered",
    statusLabel: "Delivered",
    statusLabelBn: "ডেলিভারি সম্পন্ন",
    codAmount: 3200,
    estimatedDelivery: "Delivered Mar 11, 2026 at 3:47 PM",
    pickupAddress: "Elephant Road, Dhaka",
    deliveryAddress: "Jessore Sadar, Jessore",
    pickupCoords: [23.7339, 90.3950],
    deliveryCoords: [23.1667, 89.2167],
    riderName: "Jamal Hasan",
    riderPhone: "01798765432",
    weight: "1.2 kg",
    timeline: [
      { id: "1", status: "placed", title: "Order Placed", titleBn: "অর্ডার সম্পন্ন", description: "Order confirmed by merchant", location: "Elephant Road, Dhaka", timestamp: "Mar 9, 2026 – 2:30 PM", completed: true, active: false },
      { id: "2", status: "picked_up", title: "Picked Up", titleBn: "সংগ্রহ করা হয়েছে", description: "Parcel collected from merchant", location: "Elephant Road, Dhaka", timestamp: "Mar 10, 2026 – 9:00 AM", completed: true, active: false },
      { id: "3", status: "in_transit", title: "In Transit", titleBn: "পথে আছে", description: "Parcel in transit via intercity route", location: "Aricha Highway", timestamp: "Mar 10, 2026 – 2:15 PM", completed: true, active: false },
      { id: "4", status: "out_for_delivery", title: "Out for Delivery", titleBn: "ডেলিভারিতে বের হয়েছে", description: "Rider heading to destination", location: "Jessore Sadar", timestamp: "Mar 11, 2026 – 1:00 PM", completed: true, active: false },
      { id: "5", status: "delivered", title: "Delivered", titleBn: "ডেলিভারি সম্পন্ন", description: "Parcel delivered — signed by customer", location: "Jessore Sadar, Jessore", timestamp: "Mar 11, 2026 – 3:47 PM", completed: true, active: false },
    ],
    createdAt: "Mar 9, 2026",
  },
  "01712345678": {
    orderId: "JDX-240312-7891",
    merchantName: "Fashion House BD",
    customerName: "Rahim Uddin",
    customerPhone: "01712345678",
    status: "out_for_delivery",
    statusLabel: "Out for Delivery",
    statusLabelBn: "ডেলিভারিতে বের হয়েছে",
    codAmount: 1450,
    estimatedDelivery: "Today, 2:00 PM – 4:00 PM",
    pickupAddress: "Mirpur-10, Dhaka",
    deliveryAddress: "Dhanmondi 27, Dhaka",
    pickupCoords: [23.8069, 90.3687],
    deliveryCoords: [23.7465, 90.3760],
    riderName: "Karim Hossain",
    riderPhone: "01898765432",
    weight: "0.8 kg",
    timeline: [
      { id: "1", status: "placed", title: "Order Placed", titleBn: "অর্ডার সম্পন্ন", description: "Order confirmed by merchant", location: "Mirpur-10, Dhaka", timestamp: "Mar 11, 2026 – 9:15 PM", completed: true, active: false },
      { id: "2", status: "picked_up", title: "Picked Up", titleBn: "সংগ্রহ করা হয়েছে", description: "Parcel collected from merchant", location: "Mirpur-10, Dhaka", timestamp: "Mar 12, 2026 – 10:30 AM", completed: true, active: false },
      { id: "3", status: "in_transit", title: "In Transit", titleBn: "পথে আছে", description: "Parcel at sorting hub", location: "Uttara Hub, Dhaka", timestamp: "Mar 12, 2026 – 11:45 AM", completed: true, active: false },
      { id: "4", status: "out_for_delivery", title: "Out for Delivery", titleBn: "ডেলিভারিতে বের হয়েছে", description: "Rider is on the way to deliver", location: "Dhanmondi Area", timestamp: "Mar 12, 2026 – 1:20 PM", completed: false, active: true },
      { id: "5", status: "delivered", title: "Delivered", titleBn: "ডেলিভারি সম্পন্ন", description: "Parcel delivered successfully", location: "Dhanmondi 27, Dhaka", timestamp: null, completed: false, active: false },
    ],
    createdAt: "Mar 11, 2026",
  },
};
