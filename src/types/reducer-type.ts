import { User } from "firebase/auth";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}
