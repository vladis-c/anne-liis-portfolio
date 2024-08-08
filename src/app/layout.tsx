import type {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

import './globals.css';
import authOptions from './api/auth/[...nextauth]/authOptions';
import {Environment} from '@/api/types';
import {abel, italiana} from './fonts';
import {AUTHOR} from '@/constants';
import {H4} from '@/components/Contentful/Contentful';

const isStagingEnv = (process.env.APP_ENV as Environment) === 'staging';
const admins = (process.env.ADMIN ?? '').split('|');

export const metadata: Metadata = {
  title: AUTHOR,
  description: 'Portfolio website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getServerSession(authOptions);

  if (isStagingEnv && !auth) {
    return redirect('api/auth/signin');
  }

  if (isStagingEnv && auth?.user?.name && !admins.includes(auth?.user?.name)) {
    children = <H4>Unauthorized</H4>;
  }

  return (
    <html
      lang="en"
      className={`${italiana.variable} ${abel.variable} snap-y snap-mandatory`}>
      <body className="bg-anne-indigo">{children}</body>
    </html>
  );
}
