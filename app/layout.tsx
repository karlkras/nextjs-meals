import './globals.css';
import { type ReactNode } from "react";
import MainHeader from "@/components/main-header/main-header";
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
