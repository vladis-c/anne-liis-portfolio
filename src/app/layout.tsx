import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {getServerSession} from 'next-auth';

import './globals.css';
import {authOptions} from './api/auth/[...nextauth]/route';
import {Environment} from '@/types';

const inter = Inter({subsets: ['latin']});

const currentEnv = process.env.CURRENT_ENV as Environment;
const stagingUser = process.env.STAGING_USER;

export const metadata: Metadata = {
  title: 'Anne Liis Kasterpalu',
  description: 'Portfolio website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session =
    currentEnv === 'staging' && (await getServerSession(authOptions));

  if (typeof session !== 'boolean' && session?.user?.name !== stagingUser) {
    children = <p>Unauthorized</p>;
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
