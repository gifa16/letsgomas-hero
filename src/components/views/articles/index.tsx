/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styles from './Articles.module.scss';
import Image from 'next/image';
import { Content } from 'firebase/vertexai-preview';
import { useRouter } from 'next/router';
import Footer from '@/components/fragments/Footer';

type PropTypes = {
  articles: Content[];
};

const ArticlesView = (props: PropTypes) => {
  const { articles } = props;
  const [articlesData, setArticlesData] = useState<Content[]>([]);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    setArticlesData(articles);
  }, [articles]);
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Artikel</h1>
          <div className={styles.articlesList}>
            {articlesData.map((article: any) => (
              <div key={article.id} className={styles.articleCard} onClick={() => router.push(`/article/${article.id}`)}>
                <div className={styles.imageWrapper}>
                  <Image src={`/images/${article.image}`} alt={article.title} width={200} height={200} />
                </div>
                <div className={styles.articleDetails}>
                  <h2>{article.title}</h2>
                  <p className={styles.date}>Dibuat pada: {article.createdAt}</p>
                  <p className={styles.author}>Penulis: {article.author_name}</p>
                  <p className={styles.excerpt}>{article.content.slice(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ArticlesView;
