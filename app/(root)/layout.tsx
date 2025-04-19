import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in')
  
  return (
    <div className="root-layout">
      <nav className="p-4">
        <Link href="/">
          {/* Wrap everything inside a div to apply styles */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={38} height={32} />
            <h2 className="text-primary-100">PrepBot</h2>
          </div>
        </Link>
      </nav>

      {/* Render the page content here */}
      {children}
    </div>
  );
};

export default RootLayout;