import { TimelineStep, statusMeta } from "@/lib/tracking-data";
import { Package, Truck, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  steps: TimelineStep[];
}

const stepIcons = {
  placed: Clock,
  picked_up: Package,
  in_transit: Truck,
  out_for_delivery: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const OrderTimeline = ({ steps }: OrderTimelineProps) => {
  return (
    <div className="relative space-y-0">
      {steps.map((step, index) => {
        const Icon = stepIcons[step.status];
        const isLast = index === steps.length - 1;
        const meta = statusMeta[step.status];

        return (
          <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Vertical line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[19px] top-10 h-[calc(100%-24px)] w-0.5",
                  step.completed ? "bg-primary" : "bg-border"
                )}
              />
            )}

            {/* Icon circle */}
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                step.active && "border-primary bg-primary/10 ring-4 ring-primary/20 animate-pulse-soft",
                step.completed && "border-primary bg-primary text-primary-foreground",
                !step.completed && !step.active && "border-border bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            {/* Content */}
            <div className={cn("min-w-0 flex-1 pt-1", step.active && "animate-slide-up")}>
              <div className="flex items-center gap-2">
                <p className={cn(
                  "font-semibold text-sm",
                  step.completed || step.active ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {step.titleBn}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              {step.timestamp && (
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{step.location}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                </div>
              )}
              {!step.timestamp && !step.completed && (
                <p className="text-xs text-muted-foreground/50 mt-1 italic">Pending</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
