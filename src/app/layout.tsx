import type {Metadata} from 'next';

import {getServerSession} from 'next-auth';

import './globals.css';
import authOptions from './api/auth/[...nextauth]/authOptions';
import {Environment} from '@/api/types';
import {abel, italiana} from './fonts';

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
    <html lang="en" className={`${italiana.variable} ${abel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
