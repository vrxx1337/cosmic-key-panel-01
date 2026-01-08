import { Search, Users, Key, Settings, Shield, BarChart3, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: "home", icon: Home, label: "Trang chủ" },
  { id: "search", icon: Search, label: "Tra cứu UID" },
  { id: "users", icon: Users, label: "Tài khoản" },
  { id: "keys", icon: Key, label: "Key Panel" },
  { id: "stats", icon: BarChart3, label: "Thống kê" },
  { id: "security", icon: Shield, label: "Bảo mật" },
  { id: "settings", icon: Settings, label: "Cài đặt" },
];

export const Sidebar = ({ activeTab, onTabChange, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 glass-strong border-r border-cosmic-border z-50 transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-cosmic-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-display font-bold text-lg">FF</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg gradient-text">FF LOOKUP</h1>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-primary/10 hover:translate-x-1",
                  isActive && "bg-primary/20 border border-primary/30 shadow-lg shadow-primary/20"
                )}
              >
                <Icon 
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} 
                />
                <span 
                  className={cn(
                    "font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cosmic-border">
          <div className="glass rounded-lg p-3">
            <p className="text-xs text-muted-foreground text-center">
              Phiên bản 1.0.0
            </p>
            <p className="text-xs text-primary text-center mt-1">
              © 2024 FF Lookup
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
