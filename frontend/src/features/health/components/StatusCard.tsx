import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

type StatusCardProps = {
  title: string;
  loading: boolean;
  ok: boolean;
  detail: string;
};

export function StatusCard({ title, loading, ok, detail }: StatusCardProps) {
  return (
    <Card className="bg-surface border-border">
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <h2 className="m-0 text-[1.2rem]">{title}</h2>
          {loading ? (
            <Badge variant="outline" className="gap-1.5 text-amber-600 border-amber-500/30 bg-amber-500/10">
              <Spinner className="size-3" />
              Checking
            </Badge>
          ) : ok ? (
            <Badge variant="outline" className="gap-1.5 text-green-600 border-green-500/30 bg-green-500/10">
              <CheckCircle className="size-3" />
              Online
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1.5 text-red-600 border-red-500/30 bg-red-500/10">
              <XCircle className="size-3" />
              Error
            </Badge>
          )}
        </div>
        <p className="mt-4 mb-0 text-foreground-muted leading-relaxed">{detail}</p>
      </CardContent>
    </Card>
  );
}
