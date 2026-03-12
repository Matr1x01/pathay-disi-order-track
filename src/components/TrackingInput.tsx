import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const TrackingInput = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/track/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="Enter Order ID or Phone / অর্ডার আইডি বা ফোন নম্বর"
            className="pl-10 h-12 text-base rounded-xl bg-card border-border/60 shadow-sm"
          />
        </div>
        <Button
          onClick={handleTrack}
          disabled={!query.trim()}
          className="h-12 px-6 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          Track Order
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        অর্ডার ট্র্যাক করুন • Try: <button onClick={() => setQuery("JDX-240312-7891")} className="underline text-accent hover:text-accent/80 transition-colors">JDX-240312-7891</button>
      </p>
    </div>
  );
};

export default TrackingInput;
