import { atom } from "jotai";
import { Repository } from "../types/repository";

const repositoriesAtom = atom<Repository[]>([]);
export default repositoriesAtom
