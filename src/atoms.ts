import { atom } from "recoil";

export const toDoWantAtoms = atom({ key: "want", default: [] as string[] });
export const toDoGoneAtoms = atom({ key: "gone", default: [] as string[] });
export const toDoLikeAtoms = atom({ key: "like", default: [] as string[] });
