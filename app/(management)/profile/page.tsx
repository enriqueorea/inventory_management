import { NewProfile, Profile } from "@/components/Profile";
import { currentUser } from "@/hooks/auth/current-user";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await currentUser();

  console.log(user);

  if (!user?.profile_id) {
    return redirect("/profile/create");
  }

  return <Profile id={user.profile_id} />;
};

export default ProfilePage;
