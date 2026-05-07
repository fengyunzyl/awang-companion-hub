import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 bg-card/95 backdrop-blur h-12 flex items-center px-2">
      <button
        onClick={() => router.history.back()}
        className="w-10 h-10 flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6 text-text-primary" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-text-primary">
        {title}
      </div>
    </div>
  );
}
