import type { Metadata } from 'next';
import { Nunito, Baloo_2 } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/auth/AuthProvider';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400','600','700','800','900'],
  variable: '--font-nunito',
  display: 'swap',
});

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['700','800'],
  variable: '--font-baloo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Foxly — Learn Languages Through Adventure',
  description: 'Join Finn the Fox on a magical quest to learn Spanish, French, German, Japanese & Arabic. Free language learning for kids aged 8–13.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${baloo.variable}`}>
      <body style={{ background: '#06101f', minHeight: '100vh' }}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'rgba(13,24,53,0.97)',
                color: '#f0eefc',
                border: '1px solid rgba(249,200,70,0.25)',
                borderRadius: '14px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: '700',
                backdropFilter: 'blur(12px)',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#f9c846', secondary: '#06101f' } },
              error: { iconTheme: { primary: '#ff6b6b', secondary: '#06101f' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
