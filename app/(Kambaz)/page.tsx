/*
  landing redirect
send users to account/signin on load
*/
import { redirect } from "next/navigation";
export default function Kambaz() {
 redirect("/Account/Signin");
}
