import { useState } from "react";
import { Search, Users, Key, Activity, TrendingUp, Clock } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { UIDLookup } from "@/components/UIDLookup";
import { RecentSearches } from "@/components/RecentSearches";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-4 lg:p-6">
          {/* Stats Overview - Hidden when showing results */}
          {!hasSearchResults && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6 animate-fade-in">
              <StatsCard
                title="Tra cứu hôm nay"
                value="1,234"
                icon={Search}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Users hoạt động"
                value="856"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Key hoạt động"
                value="127"
                icon={Key}
                trend={{ value: 3, isPositive: false }}
              />
              <StatsCard
                title="Tỷ lệ thành công"
                value="98.5%"
                icon={Activity}
              />
            </div>
          )}

          {/* Main Grid */}
          <div className={hasSearchResults ? "" : "grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6"}>
            {/* Left Column - UID Lookup */}
            <div className={hasSearchResults ? "" : "xl:col-span-2"}>
              <UIDLookup onResultsChange={setHasSearchResults} />
            </div>

            {/* Right Column - Recent & Stats - Hidden when showing results */}
            {!hasSearchResults && (
              <div className="space-y-4 lg:space-y-6 animate-fade-in">
                <RecentSearches />

                {/* Quick Stats */}
                <div className="glass rounded-2xl p-4 lg:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">
                      Thống kê nhanh
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tra cứu thành công</span>
                      <span className="font-display font-semibold text-success">1,215</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tra cứu thất bại</span>
                      <span className="font-display font-semibold text-destructive">19</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[2%] rounded-full bg-destructive" />
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="glass rounded-2xl p-4 lg:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">
                      Trạng thái hệ thống
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                      <span className="text-sm text-foreground">API Server</span>
                      <span className="flex items-center gap-2 text-xs lg:text-sm text-success">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        Hoạt động
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                      <span className="text-sm text-foreground">Database</span>
                      <span className="flex items-center gap-2 text-xs lg:text-sm text-success">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        Hoạt động
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                      <span className="text-sm text-foreground">Cache</span>
                      <span className="flex items-center gap-2 text-xs lg:text-sm text-warning">
                        <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                        Đang tải
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
