// layout for labs section

import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
      <aside style={{ minWidth: "200px" }}>
        <TOC />
      </aside>
      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  );
}
