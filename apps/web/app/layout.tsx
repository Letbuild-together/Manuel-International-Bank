import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manuel International Bank',
  description: 'Modern digital banking platform for international accounts and payments.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
