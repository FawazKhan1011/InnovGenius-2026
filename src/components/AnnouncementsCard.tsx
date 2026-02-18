import { announcements } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";
import { Bell, AlertTriangle, Info } from "lucide-react";

const typeConfig = {
  info: { icon: Info, color: "text-info bg-info/10" },
  warning: { icon: AlertTriangle, color: "text-warning bg-warning/10" },
  urgent: { icon: Bell, color: "text-destructive bg-destructive/10" },
};

export default function AnnouncementsCard() {
  return (
    <div className="bg-card border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-sm">Announcements</h3>
        <Bell className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {announcements.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", config.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-[11px] text-muted-foreground line-clamp-2">{item.description}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{item.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
