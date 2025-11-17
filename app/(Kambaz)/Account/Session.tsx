import * as client from "./client";
import { useEffect, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./Reducer";
export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(String(err));
      }
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
  return null;
}
