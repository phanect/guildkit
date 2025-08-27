import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  // TODO Make these modifiable
  title: "GuildKit",
  description: "A toolkit for building job search services",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://tmp.guildkit.net/canvaai/guildkit_icon_tmp.png" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
