import { NewProfile, Profile } from "@/components/Profile";
import { currentUser } from "@/hooks/auth/current-user";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user?.profile_id) {
    return <NewProfile />;
  }

  return <Profile id={user.profile_id} />;
};

export default ProfilePage;
