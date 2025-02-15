import { create } from "zustand";

import { LanguageSlice, createLanguageSlice } from "./slices/languageSlice";

export const useStore = create<LanguageSlice>()((...a) => ({
  ...createLanguageSlice(...a),
}));
