import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import ErrorButton from '@/components/error-button/ErrorButton';
import SearchBlock from '@/components/search-block/SearchBlock';
import LimitButton from '@/components/limit-input/LimitInput';
import SearchResult from '@/components/search-results/searchResult';
import Pagination from '@/components/pagination/Pagination';
const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children?: ReactNode;
  data;
};

const Layout = ({ children, data }: LayoutProps) => {
  const spellsData = data.spells;
  const nextPage = data.isNextPage;
  return (
    <>
      <Head>
        <title>Harry Potter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <ErrorButton />
          <SearchBlock />
          <div className={styles.searchDetails}>
            <LimitButton />
          </div>
          <SearchResult spells={spellsData} />
          <Pagination isNextPage={nextPage} />
        </div>
        {children}
      </main>
    </>
  );
};
export default Layout;
