import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { Home, FolderOpen, User } from "lucide-react";

export const Route = createFileRoute("/_tabs")({
  component: TabsLayout,
});

const tabs = [
  { to: "/home", label: "首页", icon: Home },
  { to: "/assets", label: "作品", icon: FolderOpen },
  { to: "/mine", label: "我的", icon: User },
] as const;

function TabsLayout() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col pb-[72px]" style={{ background: "#fafafa" }}>
      <div className="flex-1">
        <Outlet />
      </div>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card h-[68px] flex">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-1 ${
                active ? "text-primary" : "text-text-tertiary"
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
              <span className={`text-xs ${active ? "font-semibold" : ""}`}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
