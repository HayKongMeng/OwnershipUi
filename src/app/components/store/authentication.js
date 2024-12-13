import { create } from "zustand";

export const authInfoGlobal = create((set) => ({
  username: "",
  setUsername: (newValue) => set({ username: newValue }),
}));