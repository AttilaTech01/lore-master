import { formatXp, getRankTitle } from "../../services/xpService";
import type { Profile } from "../../types";
import "./ProfileHeader.css";

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="card">
      <span className="user-info-line">
        {profile.username} {formatXp(profile.xp)} {getRankTitle(profile.xp)}
      </span>
    </div>
  );
}
