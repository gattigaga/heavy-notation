import { Language } from "@prisma/client";
import { StateCreator } from "zustand";

export type LanguageSlice = {
  language: Language;
  setLanguage: (value: Language) => void;
};

export const createLanguageSlice: StateCreator<
  LanguageSlice,
  [],
  [],
  LanguageSlice
> = (set) => ({
  language: "EN",
  setLanguage: (language) => set({ language }),
});
