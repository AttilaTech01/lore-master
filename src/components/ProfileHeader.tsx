import { formatXp, getRankTitle } from "../services/xpService";
import type { Profile } from "../types";

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="user-info-container">
      <span className="user-info-line">
        {profile.username} {formatXp(profile.xp)} {getRankTitle(profile.xp)}
      </span>
    </div>
  );
}
