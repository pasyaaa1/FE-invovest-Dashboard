import { create } from "zustand";
import { persist } from "zustand/middleware";
import { studentBiodata } from "../config/biodata";

export interface Biodata {
  nama: string;
  nim: string;
  email: string;
  prodi: string;
  universitas: string;
  telepon: string;
  alamat: string;
  foto: string;
  tentang: string;
}

interface BiodataState {
  biodata: Biodata;
  updateBiodata: (data: Biodata) => void;
  resetBiodata: () => void;
}

export const useBiodataStore = create<BiodataState>()(
  persist(
    (set) => ({
      biodata: { ...studentBiodata },
      updateBiodata: (data) => set({ biodata: data }),
      resetBiodata: () => set({ biodata: { ...studentBiodata } }),
    }),
    { name: "biodata-storage" }
  )
);
