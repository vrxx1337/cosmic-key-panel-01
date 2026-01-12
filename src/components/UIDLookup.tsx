import { useState, useEffect } from "react";
import { Search, Loader2, User, Trophy, Star, Calendar, Shield, Gamepad2, Users, Heart, Zap, Image, List, AlertCircle, Clock, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type PlayerStatus = 'online' | 'offline' | 'in-game';

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
  status: PlayerStatus;
  inGameTime?: string;
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
  status: "in-game",
  inGameTime: "12:34",
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

interface UIDLookupProps {
  onResultsChange?: (hasResults: boolean) => void;
}

// UID Validation helper
type UidValidation = {
  isValid: boolean;
  message: string;
  type: 'error' | 'warning' | 'success' | 'none';
};

const validateUid = (value: string): UidValidation => {
  const MIN_UID_LENGTH = 8;
  const MIN_UID_VALUE = 10000001;

  if (!value.trim()) {
    return { isValid: false, message: '', type: 'none' };
  }

  if (!/^\d+$/.test(value)) {
    return { isValid: false, message: 'UID phải là số', type: 'error' };
  }

  if (value.length < MIN_UID_LENGTH) {
    return { isValid: false, message: `UID phải có ít nhất ${MIN_UID_LENGTH} chữ số`, type: 'warning' };
  }

  if (parseInt(value, 10) < MIN_UID_VALUE) {
    return { isValid: false, message: `UID phải lớn hơn hoặc bằng ${MIN_UID_VALUE.toLocaleString()}`, type: 'warning' };
  }

  return { isValid: true, message: 'UID hợp lệ', type: 'success' };
};

export const UIDLookup = ({ onResultsChange }: UIDLookupProps) => {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [guildInfo, setGuildInfo] = useState<GuildInfo | null>(null);
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [outfitInfo, setOutfitInfo] = useState<OutfitInfo | null>(null);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showOutfitDetails, setShowOutfitDetails] = useState(false);
  const [showValidMessage, setShowValidMessage] = useState(false);

  const uidValidation = validateUid(uid);

  // Auto-hide valid message after 2 seconds
  useEffect(() => {
    if (uidValidation.type === 'success' && uid) {
      setShowValidMessage(true);
      const timer = setTimeout(() => {
        setShowValidMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowValidMessage(false);
    }
  }, [uidValidation.type, uid]);

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUid(newValue);
    setError("");
    setFetchError(null);
    
    // Clear results when UID is cleared
    if (!newValue.trim()) {
      setPlayerInfo(null);
      setGuildInfo(null);
      setPetInfo(null);
      setOutfitInfo(null);
      onResultsChange?.(false);
    }
  };

  const handleSearch = async () => {
    if (!uidValidation.isValid) {
      setError(uidValidation.message || "UID không hợp lệ");
      return;
    }

    setLoading(true);
    setError("");
    setFetchError(null);
    setPlayerInfo(null);
    setGuildInfo(null);
    setPetInfo(null);
    setOutfitInfo(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate error for specific UIDs (demo)
    if (uid === "99999999" || uid === "11111111") {
      setFetchError("Không tìm thấy người chơi với UID này");
      setLoading(false);
      onResultsChange?.(true);
      return;
    }

    // Return mock data for demo
    setPlayerInfo({ ...mockPlayerData, uid });
    setGuildInfo(mockGuildData);
    setPetInfo(mockPetData);
    setOutfitInfo(mockOutfitData);
    setLoading(false);
    onResultsChange?.(true);
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
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Nhập UID người chơi..."
              value={uid}
              onChange={handleUidChange}
              onKeyPress={handleKeyPress}
            />
            {/* UID Validation Status - Text only, no border colors */}
            {uid && (uidValidation.type === 'error' || uidValidation.type === 'warning' || showValidMessage) && (
              <div className={cn(
                "flex items-center gap-1.5 text-xs transition-all duration-200 animate-fade-in",
                uidValidation.type === 'error' && "text-destructive",
                uidValidation.type === 'warning' && "text-amber-500",
                showValidMessage && uidValidation.type === 'success' && "text-green-500"
              )}>
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  uidValidation.type === 'error' && "bg-destructive",
                  uidValidation.type === 'warning' && "bg-amber-500",
                  showValidMessage && uidValidation.type === 'success' && "bg-green-500"
                )} />
                {uidValidation.message}
              </div>
            )}
          </div>
          <Button 
            variant="default" 
            size="lg"
            onClick={handleSearch}
            disabled={loading || !uidValidation.isValid}
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
          <p className="text-destructive text-sm mt-3 flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>

      {/* Skeleton Loading State */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
          {/* Player Info Skeleton */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="mb-4">
              <Skeleton className="h-20 lg:h-24 rounded-t-xl" />
              <div className="flex items-end -mt-8 pl-4">
                <Skeleton className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl border-4 border-card" />
                <div className="ml-3 pb-1 flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton className="h-2.5 w-10" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outfit Skeleton */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Skeleton className="aspect-[3/4] w-full" />
          </div>

          {/* Guild Skeleton */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-14 h-14 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-2.5 w-10" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pet Skeleton */}
          <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-14 h-14 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-2.5 w-10" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      )}

      {/* Error State - UID not found */}
      {fetchError && !loading && (
        <div className="bg-card rounded-xl border border-destructive/30 p-4 lg:p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive">Lỗi tra cứu</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <User className="w-8 h-8 lg:w-10 lg:h-10 text-destructive/50" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground">UID: {uid}</h4>
              <p className="text-sm text-destructive">{fetchError}</p>
              <p className="text-xs text-muted-foreground mt-1">Vui lòng kiểm tra lại UID và thử lại</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid - Sections with smooth staggered animations */}
      {playerInfo && !loading && !fetchError && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Section 1: Player Info */}
          <div 
            className="bg-card rounded-xl border border-border p-4 lg:p-5 animate-fade-in"
            style={{ animationDuration: '400ms', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
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
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-secondary border-4 border-card flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
                </div>
                <div className="ml-3 pb-1 flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-foreground truncate leading-tight">{playerInfo.nickname}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StatusBadge status={playerInfo.status} inGameTime={playerInfo.inGameTime} />
                    <span className="text-[10px] text-muted-foreground/60">•</span>
                    <p className="text-[11px] text-muted-foreground font-mono">UID: {playerInfo.uid}</p>
                  </div>
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

          {/* Section 2: Outfit/Equipment */}
          <div 
            className="bg-card rounded-xl border border-border overflow-hidden relative animate-fade-in"
            style={{ animationDuration: '400ms', animationDelay: '75ms', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', animationFillMode: 'both' }}
          >
            <div className={cn(
              "transition-all duration-500 ease-in-out",
              showOutfitDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            )}>
              {/* Detail View - Outfit Names */}
              <div className="p-4 lg:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Trang phục</h3>
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
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOutfitDetails(false)}
                    className="text-xs gap-1.5"
                  >
                    <Image className="w-3.5 h-3.5" />
                    Xem ảnh
                  </Button>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "transition-all duration-500 ease-in-out",
              !showOutfitDetails ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
            )}>
              {/* Image View - Full Cover */}
              <div className="relative aspect-[3/4] w-full bg-secondary flex items-center justify-center">
                <User className="w-28 h-28 lg:w-36 lg:h-36 text-muted-foreground/30" />
                
                {/* Overlay Header */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <div className="flex items-center gap-2">
                    <Image className="w-5 h-5 text-white/90" />
                    <h3 className="font-semibold text-white/90">Trang phục</h3>
                  </div>
                </div>
                
                {/* Overlay Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOutfitDetails(true)}
                    className="text-xs gap-1.5 text-white border-white/20 hover:bg-white/20"
                  >
                    <List className="w-3.5 h-3.5" />
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: In-Game Status Card (separate card) */}
          {playerInfo.status === 'in-game' && (
            <div 
              className="bg-card rounded-xl border border-amber-500/30 p-4 lg:p-5 animate-fade-in"
              style={{ animationDuration: '400ms', animationDelay: '150ms', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Gamepad2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-amber-400">Trạng thái trong trận</h3>
                <div className="ml-auto w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{playerInfo.nickname}</p>
                  <p className="text-xs text-amber-400">Đang trong trận đấu</p>
                </div>
                {playerInfo.inGameTime && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-mono text-amber-300">{playerInfo.inGameTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 4: Guild Info */}
          <div 
            className="bg-card rounded-xl border border-border p-4 lg:p-5 animate-fade-in"
            style={{ animationDuration: '400ms', animationDelay: '225ms', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', animationFillMode: 'both' }}
          >
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

          {/* Section 5: Pet Info */}
          <div 
            className="bg-card rounded-xl border border-border p-4 lg:p-5 animate-fade-in"
            style={{ animationDuration: '400ms', animationDelay: '300ms', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', animationFillMode: 'both' }}
          >
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

      {/* Empty State - Only show when no search has been made and no error */}
      {!playerInfo && !loading && !fetchError && (
        <div className="bg-card rounded-xl border border-border p-8 lg:p-12 text-center animate-fade-in">
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

interface StatusBadgeProps {
  status: PlayerStatus;
  inGameTime?: string;
}

const StatusBadge = ({ status, inGameTime }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          label: 'Online',
          bgClass: 'bg-green-500/15',
          textClass: 'text-green-400',
          dotClass: 'bg-green-500',
        };
      case 'in-game':
        return {
          label: inGameTime ? `${inGameTime}` : 'In-game',
          bgClass: 'bg-amber-500/15',
          textClass: 'text-amber-400',
          dotClass: 'bg-amber-500',
        };
      case 'offline':
      default:
        return {
          label: 'Offline',
          bgClass: 'bg-muted/50',
          textClass: 'text-muted-foreground',
          dotClass: 'bg-muted-foreground',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full shrink-0",
      config.bgClass
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full shrink-0",
        config.dotClass,
        status !== 'offline' && "animate-pulse"
      )} />
      <span className={cn("text-[10px] font-medium leading-none", config.textClass)}>
        {config.label}
      </span>
    </div>
  );
};
