import { useState } from "react";
import { Search, Users, Key, Activity, TrendingUp, Clock } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { UIDLookup } from "@/components/UIDLookup";
import { RecentSearches } from "@/components/RecentSearches";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Tổng tra cứu hôm nay"
              value="1,234"
              icon={Search}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Người dùng hoạt động"
              value="856"
              icon={Users}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Key đang hoạt động"
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

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - UID Lookup */}
            <div className="lg:col-span-2">
              <UIDLookup />
            </div>

            {/* Right Column - Recent & Stats */}
            <div className="space-y-6">
              <RecentSearches />

              {/* Quick Stats */}
              <div className="glass rounded-2xl p-5">
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
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-violet" />
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
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    Trạng thái hệ thống
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                    <span className="text-sm text-foreground">API Server</span>
                    <span className="flex items-center gap-2 text-sm text-success">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Hoạt động
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                    <span className="text-sm text-foreground">Database</span>
                    <span className="flex items-center gap-2 text-sm text-success">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Hoạt động
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                    <span className="text-sm text-foreground">Cache</span>
                    <span className="flex items-center gap-2 text-sm text-warning">
                      <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                      Đang tải
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
