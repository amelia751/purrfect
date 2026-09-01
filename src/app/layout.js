import { Ubuntu } from 'next/font/google';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
});

export const metadata = {
  title: 'Purrfect Coffee',
  description: 'Cat cafe in Ho Chi Minh City, Vietnam',
  icons: {
    icon: '/purrfect-logo-white.png',
    apple: '/purrfect-logo-white.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
