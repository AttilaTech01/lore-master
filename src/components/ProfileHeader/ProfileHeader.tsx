import { formatXp, getRankTitle } from "../../services/xpService";
import type { Profile } from "../../types";
import "./ProfileHeader.css";

interface ProfileHeaderProps {
  profile: Profile;
  onLogout: () => void;
}

export function ProfileHeader({ profile, onLogout }: ProfileHeaderProps) {
  return (
    <div className="card profile-header">
      <div className="profile-details">
        <span className="profile-name">{profile.username}</span>
        <span className="user-info-line">
          {formatXp(profile.xp)} {getRankTitle(profile.xp)}
        </span>
      </div>
      <button type="button" className="logout-button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
