/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      KAMBAZ LAYOUT                                        ║
 * ║                    Main Application Shell                                 ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This layout wraps all Kambaz pages and provides:
 * - Redux Provider (for global state management)
 * - Session component (for authentication)
 * - Navigation sidebar
 * 
 * ROUTE GROUPS:
 * The folder name "(Kambaz)" uses parentheses, making it a "route group".
 * This means:
 * - The folder organizes files but doesn't affect the URL
 * - /Kambaz/Dashboard → app/(Kambaz)/Dashboard/page.tsx
 * - The (Kambaz) part is invisible in the URL
 * 
 * @author Alara
 */

"use client";

import { Provider } from "react-redux";
import store from "./store";
import Session from "./Account/Session";
import Navigation from "./Navigation";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session>
        <div className="d-flex">
          {/* Left Navigation Sidebar */}
          <Navigation />
          
          {/* Main Content Area */}
          <div className="wd-main-content-offset flex-grow-1">
            {children}
          </div>
        </div>
      </Session>
    </Provider>
  );
}
