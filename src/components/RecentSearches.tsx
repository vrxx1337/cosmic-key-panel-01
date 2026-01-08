import { Clock, User, ArrowRight } from "lucide-react";

const recentSearches = [
  { uid: "1234567890", nickname: "ProGamer_VN", time: "2 phút", level: 75 },
  { uid: "9876543210", nickname: "DragonSlayer", time: "15 phút", level: 68 },
  { uid: "5555555555", nickname: "NightHawk_FF", time: "1 giờ", level: 82 },
  { uid: "1111111111", nickname: "VietnamPro", time: "2 giờ", level: 71 },
];

export const RecentSearches = () => {
  return (
    <div className="glass rounded-2xl p-4 lg:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-sm lg:text-base text-foreground">
            Tra cứu gần đây
          </h3>
        </div>
        <button className="text-xs lg:text-sm text-primary hover:underline flex items-center gap-1">
          Tất cả <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
        </button>
      </div>

      <div className="space-y-2 lg:space-y-3">
        {recentSearches.map((search, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2.5 lg:p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shrink-0">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">
                {search.nickname}
              </p>
              <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
                UID: {search.uid} • Lv.{search.level}
              </p>
            </div>
            <span className="text-[10px] lg:text-xs text-muted-foreground whitespace-nowrap">
              {search.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
