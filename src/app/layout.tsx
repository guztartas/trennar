import type { Metadata } from 'next';
import { Cormorant_Garamond, Sora } from 'next/font/google';
import './globals.css';

const bodyFont = Sora({
  subsets: ['latin'],
  variable: '--font-body',
});

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Trennar Clínica de Fisioterapia',
  description:
    'Clínica de fisioterapia com foco em reabilitação, atendimento individualizado e pilates clínico.',
  openGraph: {
    title: 'Trennar Clínica de Fisioterapia',
    description:
      'Atendimento especializado em fisioterapia, reabilitação e pilates clínico.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
