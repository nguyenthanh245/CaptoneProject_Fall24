import { create } from "zustand";
import { TResponseInfoUser } from "../services/auth-api";

type TUserStore = {
  user: TResponseInfoUser | null;
  setUser: (user: TResponseInfoUser | null) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
