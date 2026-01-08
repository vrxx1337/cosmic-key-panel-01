import { Bell, User, Moon } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  isSidebarOpen?: boolean;
}

export const Header = ({ isSidebarOpen }: HeaderProps) => {
  return (
    <header className="h-16 glass-strong border-b border-cosmic-border flex items-center justify-between px-4 lg:px-6">
      <div className="pl-12 lg:pl-0">
        <h2 className="font-display text-base lg:text-lg font-semibold text-foreground">
          Dashboard
        </h2>
        <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">
          Tra cứu thông tin tài khoản Free Fire
        </p>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <Button variant="ghost" size="icon" className="relative w-9 h-9 lg:w-10 lg:h-10">
          <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-9 h-9 lg:w-10 lg:h-10 hidden sm:flex">
          <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
        </Button>

        <div className="h-8 w-px bg-cosmic-border mx-1 lg:mx-2 hidden sm:block" />

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
};
