import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manuel International Bank',
  description: 'Global digital banking platform with secure account management.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
