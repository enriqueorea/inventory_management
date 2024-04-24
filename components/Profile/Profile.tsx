import { getProfileByID } from "@/data/profile";
import { currentUser } from "@/hooks/auth/current-user";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";

import React, { Suspense } from "react";
import { ProfileDetails } from "./ProfileDetails";

export const Profile = async ({ id }: { id: string }) => {
  const profile = await getProfileByID(id);

  const user = await currentUser();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="w-full grid place-content-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          <Avatar
            color="primary"
            isBordered
            src={user?.image as string}
            alt={"Profile picture"}
            className="w-[150px] h-[150px] text-large"
          />

          <h1 className="text-2xl font-bold text-slate-800">
            {profile?.fullname}
          </h1>
          <span className="text-slate-400 text">@{user?.name}</span>
        </div>
        <div>
          <ProfileDetails profile={profile} />
        </div>
      </section>
    </Suspense>
  );
};
