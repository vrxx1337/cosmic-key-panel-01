import { Clock, User, ArrowRight } from "lucide-react";

const recentSearches = [
  { uid: "1234567890", nickname: "ProGamer_VN", time: "2 phút trước", level: 75 },
  { uid: "9876543210", nickname: "DragonSlayer", time: "15 phút trước", level: 68 },
  { uid: "5555555555", nickname: "NightHawk_FF", time: "1 giờ trước", level: 82 },
  { uid: "1111111111", nickname: "VietnamPro", time: "2 giờ trước", level: 71 },
  { uid: "2222222222", nickname: "HeadshotKing", time: "3 giờ trước", level: 79 },
];

export const RecentSearches = () => {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Tra cứu gần đây
          </h3>
        </div>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {recentSearches.map((search, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {search.nickname}
              </p>
              <p className="text-xs text-muted-foreground">
                UID: {search.uid} • Level {search.level}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {search.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
