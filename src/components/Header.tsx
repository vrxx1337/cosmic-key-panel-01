import { Bell, User, Moon } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="h-16 glass-strong border-b border-cosmic-border flex items-center justify-between px-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground">
          Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Tra cứu thông tin tài khoản Free Fire
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Moon className="w-5 h-5" />
        </Button>

        <div className="h-8 w-px bg-cosmic-border mx-2" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-violet flex items-center justify-center cosmic-glow">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
};
