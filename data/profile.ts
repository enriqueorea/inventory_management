import { db } from "@/lib/prisma";
import { Profile } from "@prisma/client";

export const getProfileByID = async (id: string) => {
  const profile = await db.profile.findUnique({ where: { id } });

  return profile;
};

export const getProfileByUserID = async (userId: string) => {
  const profile = await db.profile.findUnique({ where: { userId } });
  return profile;
};

export const createProfile = async (data: Profile) => {
  const profile = db.profile.create({
    data,
  });

  return profile;
};

export const updateProfile = async (id: string, data: Profile) => {
  const profile = db.profile.update({
    where: { id },
    data,
  });

  return profile;
};
