import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [target, setTarget] = useState<string | null>(null);
  useEffect(() => {
    const done = typeof window !== "undefined" && localStorage.getItem("aw_onboarded") === "1";
    setTarget(done ? "/home" : "/onboarding/welcome");
  }, []);
  if (!target) {
    return <div className="min-h-screen bg-background" />;
  }
  return <Navigate to={target} />;
}
