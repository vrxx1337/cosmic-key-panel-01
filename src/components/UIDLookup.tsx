import { useState } from "react";
import { Search, Loader2, User, Trophy, Star, Calendar, Shield, Gamepad2, Users, Heart, Zap, Image } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface PlayerInfo {
  uid: string;
  nickname: string;
  level: number;
  likes: number;
  exp: number;
  brRank: string;
  csRank: string;
  region: string;
  lastLogin: string;
  accountCreated: string;
  avatar: string;
  banner: string;
}

interface GuildInfo {
  name: string;
  id: string;
  level: number;
  members: number;
  capacity: number;
  leader: string;
}

interface PetInfo {
  name: string;
  type: string;
  level: number;
  exp: number;
  skill: string;
}

interface OutfitInfo {
  head: string;
  mask: string;
  top: string;
  bottom: string;
  shoes: string;
  backpack: string;
}

// Mock data for demo
const mockPlayerData: PlayerInfo = {
  uid: "1234567890",
  nickname: "ProGamer_VN",
  level: 75,
  likes: 15420,
  exp: 892450,
  brRank: "Grandmaster",
  csRank: "Diamond IV",
  region: "Vietnam",
  lastLogin: "2024-01-08 14:30",
  accountCreated: "2020-03-15",
  avatar: "",
  banner: "",
};

const mockGuildData: GuildInfo = {
  name: "Vietnam Elite",
  id: "GD123456",
  level: 7,
  members: 48,
  capacity: 50,
  leader: "LeaderVN",
};

const mockPetData: PetInfo = {
  name: "Falco",
  type: "Falcon",
  level: 7,
  exp: 85000,
  skill: "Skyline Spree",
};

const mockOutfitData: OutfitInfo = {
  head: "Cobra Strike Helmet",
  mask: "Midnight Prowler",
  top: "Cyber Hunter Jacket",
  bottom: "Night Stalker Pants",
  shoes: "Speed Drift Boots",
  backpack: "Dragon Fury Pack",
};

export const UIDLookup = () => {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [guildInfo, setGuildInfo] = useState<GuildInfo | null>(null);
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [outfitInfo, setOutfitInfo] = useState<OutfitInfo | null>(null);
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
    setGuildInfo(null);
    setPetInfo(null);
    setOutfitInfo(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return mock data for demo
    setPlayerInfo({ ...mockPlayerData, uid });
    setGuildInfo(mockGuildData);
    setPetInfo(mockPetData);
    setOutfitInfo(mockOutfitData);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Search Box */}
      <div className="bg-card rounded-xl border border-border p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-base lg:text-lg text-foreground">
              Tra cứu thông tin người chơi
            </h3>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Nhập UID để xem thông tin tài khoản
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Nhập UID người chơi..."
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            variant="default" 
            size="lg"
            onClick={handleSearch}
            disabled={loading}
            className="sm:w-auto w-full"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span className="ml-2">Tra cứu</span>
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
            {error}
          </p>
        )}
      </div>

      {/* Results Grid - 4 Sections */}
      {playerInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
          
          {/* Section 1: Outfit/Equipment */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Image className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Trang phục</h3>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Character Placeholder */}
              <div className="w-32 h-40 lg:w-40 lg:h-48 rounded-xl bg-secondary border border-border flex items-center justify-center mb-4">
                <User className="w-16 h-16 lg:w-20 lg:h-20 text-muted-foreground/50" />
              </div>
              
              {outfitInfo && (
                <div className="w-full space-y-2">
                  <OutfitItem label="Mũ" value={outfitInfo.head} />
                  <OutfitItem label="Mặt nạ" value={outfitInfo.mask} />
                  <OutfitItem label="Áo" value={outfitInfo.top} />
                  <OutfitItem label="Quần" value={outfitInfo.bottom} />
                  <OutfitItem label="Giày" value={outfitInfo.shoes} />
                  <OutfitItem label="Balo" value={outfitInfo.backpack} />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Player Info */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Thông tin người chơi</h3>
            </div>

            {/* Avatar & Banner */}
            <div className="mb-4">
              {/* Banner */}
              <div className="h-20 lg:h-24 rounded-t-xl bg-gradient-to-r from-secondary to-muted flex items-center justify-center border border-border border-b-0">
                <span className="text-xs text-muted-foreground">Banner</span>
              </div>
              
              {/* Avatar overlapping banner */}
              <div className="flex items-end -mt-8 pl-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-secondary border-4 border-card flex items-center justify-center">
                  <User className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
                </div>
                <div className="ml-3 pb-1">
                  <h4 className="font-bold text-lg text-foreground">{playerInfo.nickname}</h4>
                  <p className="text-xs text-muted-foreground font-mono">UID: {playerInfo.uid}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem icon={Star} label="Level" value={playerInfo.level.toString()} />
                <InfoItem icon={Heart} label="Likes" value={playerInfo.likes.toLocaleString()} />
                <InfoItem icon={Trophy} label="BR Rank" value={playerInfo.brRank} highlight />
                <InfoItem icon={Gamepad2} label="CS Rank" value={playerInfo.csRank} />
                <InfoItem icon={Zap} label="EXP" value={playerInfo.exp.toLocaleString()} />
                <InfoItem icon={Star} label="Region" value={playerInfo.region} />
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem icon={Calendar} label="Ngày tạo" value={playerInfo.accountCreated} />
                  <InfoItem icon={Calendar} label="Đăng nhập" value={playerInfo.lastLogin} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Guild Info */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Quân đoàn</h3>
            </div>

            {guildInfo ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center">
                    <Shield className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{guildInfo.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">ID: {guildInfo.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoItem icon={Star} label="Level" value={guildInfo.level.toString()} />
                  <InfoItem icon={Users} label="Thành viên" value={`${guildInfo.members}/${guildInfo.capacity}`} />
                  <InfoItem icon={Trophy} label="Trưởng" value={guildInfo.leader} />
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Không có quân đoàn</p>
              </div>
            )}
          </div>

          {/* Section 4: Pet Info */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Pet</h3>
            </div>

            {petInfo ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center">
                    <Heart className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{petInfo.name}</h4>
                    <p className="text-xs text-muted-foreground">{petInfo.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoItem icon={Star} label="Level" value={petInfo.level.toString()} />
                  <InfoItem icon={Zap} label="EXP" value={petInfo.exp.toLocaleString()} />
                </div>

                <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Kỹ năng</p>
                  <p className="text-sm font-medium text-foreground">{petInfo.skill}</p>
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Không có pet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!playerInfo && !loading && (
        <div className="bg-card rounded-xl border border-border p-8 lg:p-12 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg lg:text-xl text-foreground mb-2">
            Chưa có dữ liệu
          </h3>
          <p className="text-sm lg:text-base text-muted-foreground max-w-md mx-auto">
            Nhập UID người chơi Free Fire để xem thông tin chi tiết
          </p>
        </div>
      )}
    </div>
  );
};

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}

const InfoItem = ({ icon: Icon, label, value, highlight }: InfoItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
        highlight ? "bg-primary/15" : "bg-secondary"
      )}>
        <Icon className={cn(
          "w-4 h-4",
          highlight ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className={cn(
          "font-medium text-sm truncate",
          highlight ? "text-primary" : "text-foreground"
        )}>
          {value}
        </p>
      </div>
    </div>
  );
};

interface OutfitItemProps {
  label: string;
  value: string;
}

const OutfitItem = ({ label, value }: OutfitItemProps) => {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-secondary/50 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium truncate ml-2">{value}</span>
    </div>
  );
};
