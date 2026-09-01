import './globals.css';
import I18nProvider from '@/components/I18nProvider';

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
    <html lang="vi">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
