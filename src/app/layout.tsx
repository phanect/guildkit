import "@/lib/styles/global.postcss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // TODO Make these modifiable
  title: "GuildKit",
  description: "A toolkit for building job search services",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="%sveltekit.assets%/images/logo.svg" /> */}
        <link rel="icon" href="https://tmp.guildkit.net/canvaai/guildkit_icon_tmp.png" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
