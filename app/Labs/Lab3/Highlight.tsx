/*
  lab3 · highlight component
  wraps text with custom colors for demo emphasis
*/
import { ReactNode } from "react";
// highlight component · receives children to emphasize
export default function Highlight({ children }: { children: ReactNode }) {
  return (
    <span id="wd-highlight" style={{ backgroundColor: "yellow", color: "red" }}>
      {children}
    </span>
  );
}
