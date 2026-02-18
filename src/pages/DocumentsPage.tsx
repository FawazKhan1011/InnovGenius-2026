import { documentItems } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";
import { Upload, CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig = {
  verified: { icon: CheckCircle2, label: "Verified", color: "text-success bg-success/10 border-success/20" },
  "under-review": { icon: Clock, label: "Under Review", color: "text-warning bg-warning/10 border-warning/20" },
  missing: { icon: AlertCircle, label: "Missing", color: "text-destructive bg-destructive/10 border-destructive/20" },
};

export default function DocumentsPage() {
  const verified = documentItems.filter((d) => d.status === "verified").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl mb-1">Document Upload</h1>
        <p className="text-sm text-muted-foreground">
          Upload and track your documents. {verified}/{documentItems.length} verified.
        </p>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center bg-primary/[0.02] hover:bg-primary/5 transition-colors cursor-pointer">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-semibold text-sm mb-1">Drag & drop files here</h3>
        <p className="text-xs text-muted-foreground mb-3">or click to browse • PDF, JPG, PNG up to 5MB</p>
        <Button variant="outline" size="sm" className="rounded-xl">
          Browse Files
        </Button>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        <h2 className="font-heading font-bold text-sm">Document Checklist</h2>
        {documentItems.map((doc) => {
          const config = statusConfig[doc.status];
          const Icon = config.icon;
          return (
            <div
              key={doc.id}
              className="flex items-center gap-4 bg-card border rounded-2xl p-4 hover:shadow-card transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {doc.required ? "Required" : "Optional"}
                </p>
              </div>
              <div className={cn("flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border", config.color)}>
                <Icon className="w-3 h-3" />
                {config.label}
              </div>
              {doc.status === "missing" && (
                <Button size="sm" className="gradient-primary text-primary-foreground rounded-xl text-xs h-8">
                  Upload
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
