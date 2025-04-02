import ThemeContextProvider from "@/styles/ThemeContext";
import "@/styles/globals.css";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <meta name="robots" content="noindex" />
        <title>Acme | Codeyard</title>
      </head>

      <body className="layout">
        <ThemeContextProvider>
          <main className="content">{children}</main>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
