import { useQuery } from "@tanstack/react-query";
import { apiCall } from "@/lib/api";
import { Order, OrderStatus, TimelineStep } from "@/lib/tracking-data";

async function fetchOrderTracking(orderId?: string): Promise<Order | null> {
    if (!orderId) return null;
    const response = await apiCall(`/orders/${orderId}`);
    const data = 'data' in response ? response.data : response;

    // Map backend statuses to frontend ones
    const statusMap: Record<string, OrderStatus> = {
        PENDING: "placed",
        PICKED_UP: "picked_up",
        IN_TRANSIT: "in_transit",
        OUT_FOR_DELIVERY: "out_for_delivery",
        DELIVERED: "delivered",
        CANCELLED: "cancelled"
    };

    const normalizedStatus = statusMap[data.status?.toUpperCase()] || "placed";

    const normalizedTimeline: TimelineStep[] = (data.timeline || []).map((step: any, index: number) => {
        const stepStatus = statusMap[step.status?.toUpperCase()] || "placed";
        
        let formattedTime = null;
        if (step.timestamp) {
            const d = new Date(step.timestamp);
            formattedTime = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' – ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        }
        
        return {
            id: String(index),
            status: stepStatus,
            title: step.label || step.title || step.status || "Update",
            titleBn: step.titleBn || "",
            description: step.description || "",
            location: step.location || "",
            timestamp: formattedTime,
            completed: step.completed ?? false,
            active: step.active ?? false
        };
    });

    let estimatedDelivery = "Unknown";
    if (data.estimatedDelivery) {
        if (typeof data.estimatedDelivery === 'number') {
            estimatedDelivery = `In ${Math.ceil(data.estimatedDelivery)} days`;
        } else {
            estimatedDelivery = String(data.estimatedDelivery);
        }
    }

    return {
        ...data,
        orderId: data.orderKey || data.orderId,
        status: normalizedStatus,
        timeline: normalizedTimeline,
        pickupCoords: data.pickupCoords || [23.8103, 90.4125],
        deliveryCoords: data.deliveryCoords || [23.8103, 90.4125],
        merchantName: data.merchantName || "Unknown Merchant",
        estimatedDelivery,
        createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""
    } as Order;
}

export function useOrderTracking(orderId?: string) {
    return useQuery({
        queryKey: ["order-tracking", orderId],
        queryFn: () => fetchOrderTracking(orderId),
        enabled: !!orderId,
        retry: false,
    });
}
