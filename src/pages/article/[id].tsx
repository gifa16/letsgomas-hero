// DetailArticle.tsx
import { GetServerSideProps } from 'next';
import styles from './DetailArticle.module.scss';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';

type ArticleProps = {
  article: {
    id: string;
    title: string;
    content: string;
    image: string;
    author_name: string;
    createdAt: string;
    updatedAt: string;
  };
};

const DetailArticle = ({ article }: ArticleProps) => {
  const router = useRouter();

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{article.title}</h1>
        <p className={styles.meta}>
          Oleh {article.author_name} | {article.createdAt}
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <Image src={`/images/${article.image}`} alt={article.title} width={800} height={400} className={styles.image} />
        </div>
        <article className={styles.content}>
          <p>{article.content}</p>
        </article>
        <Button type='button' onClick={() => router.push('/articles')}>
          Kembali
        </Button>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/article?id=${id}`);
  const data = await res.json();

  if (!data.status) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: data.data,
    },
  };
};

export default DetailArticle;
