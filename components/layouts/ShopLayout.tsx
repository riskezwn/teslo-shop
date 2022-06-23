import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';

interface Props {
  children: ReactNode
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({
  children, title, pageDescription, imageFullUrl,
}) => (
  <>
    <Head>
      <meta name="description" content={pageDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={pageDescription} />
      {
        imageFullUrl && (
          <meta name="og:image" content={imageFullUrl} />
        )
      }
      <title>{title}</title>
    </Head>
    <nav>
      <Navbar />
    </nav>
    <SideMenu />
    <main style={{
      margin: '80px auto',
      maxWidth: '1440px',
      padding: '0 30px',
    }}
    >
      {children}
    </main>
    <footer>
      {/* TODO: Footer */}
    </footer>
  </>

);

export default ShopLayout;
