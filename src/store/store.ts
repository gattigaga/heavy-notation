import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LanguageSlice, createLanguageSlice } from "./slices/languageSlice";

export const useStore = create<LanguageSlice>()(
  persist(
    (...a) => ({
      ...createLanguageSlice(...a),
    }),
    {
      name: "main-storage",
    },
  ),
);
