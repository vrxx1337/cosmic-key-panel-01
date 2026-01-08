import { useState } from "react";
import { Search, Loader2, User, Trophy, Star, Calendar, Shield, Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface PlayerInfo {
  uid: string;
  nickname: string;
  level: number;
  likes: number;
  rank: string;
  brRank: string;
  csRank: string;
  guild: string;
  region: string;
  lastLogin: string;
  accountCreated: string;
  avatar: string;
}

// Mock data for demo
const mockPlayerData: PlayerInfo = {
  uid: "1234567890",
  nickname: "ProGamer_VN",
  level: 75,
  likes: 15420,
  rank: "Heroic",
  brRank: "Grandmaster",
  csRank: "Diamond IV",
  guild: "Vietnam Elite",
  region: "Vietnam",
  lastLogin: "2024-01-08 14:30",
  accountCreated: "2020-03-15",
  avatar: "",
};

export const UIDLookup = () => {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!uid.trim()) {
      setError("Vui lòng nhập UID");
      return;
    }

    if (!/^\d+$/.test(uid)) {
      setError("UID chỉ chứa số");
      return;
    }

    setLoading(true);
    setError("");
    setPlayerInfo(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return mock data for demo
    setPlayerInfo({ ...mockPlayerData, uid });
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="glass-strong rounded-2xl p-6 cosmic-glow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              Tra cứu thông tin người chơi
            </h3>
            <p className="text-sm text-muted-foreground">
              Nhập UID để xem thông tin tài khoản Free Fire
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Nhập UID người chơi..."
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            variant="cosmic" 
            size="lg"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span className="hidden sm:inline ml-2">Tra cứu</span>
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
            {error}
          </p>
        )}
      </div>

      {/* Player Info */}
      {playerInfo && (
        <div className="animate-fade-in">
          {/* Player Header */}
          <div className="glass-strong rounded-2xl p-6 mb-4 cosmic-glow">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cosmic-purple to-cosmic-violet flex items-center justify-center cosmic-glow-strong">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-display font-bold text-2xl gradient-text">
                    {playerInfo.nickname}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                    Online
                  </span>
                </div>
                <p className="text-muted-foreground font-display">
                  UID: {playerInfo.uid}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-warning" />
                    Level {playerInfo.level}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4 text-primary" />
                    {playerInfo.likes.toLocaleString()} likes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              icon={Trophy}
              label="Battle Royale Rank"
              value={playerInfo.brRank}
              highlight
            />
            <InfoCard
              icon={Gamepad2}
              label="Clash Squad Rank"
              value={playerInfo.csRank}
            />
            <InfoCard
              icon={Shield}
              label="Guild"
              value={playerInfo.guild}
            />
            <InfoCard
              icon={Star}
              label="Region"
              value={playerInfo.region}
            />
            <InfoCard
              icon={Calendar}
              label="Ngày tạo tài khoản"
              value={playerInfo.accountCreated}
            />
            <InfoCard
              icon={Calendar}
              label="Đăng nhập gần nhất"
              value={playerInfo.lastLogin}
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!playerInfo && !loading && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
            <Gamepad2 className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-xl text-foreground mb-2">
            Chưa có dữ liệu
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Nhập UID người chơi Free Fire vào ô tìm kiếm để xem thông tin tài khoản chi tiết
          </p>
        </div>
      )}
    </div>
  );
};

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}

const InfoCard = ({ icon: Icon, label, value, highlight }: InfoCardProps) => {
  return (
    <div className={cn(
      "glass rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]",
      highlight && "cosmic-glow border-primary/30"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          highlight ? "bg-primary/30" : "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            highlight ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={cn(
            "font-semibold",
            highlight ? "text-primary" : "text-foreground"
          )}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
