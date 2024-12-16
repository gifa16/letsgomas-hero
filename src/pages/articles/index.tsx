import ArticlesView from '@/components/views/articles';
import articleServices from '@/services/article';
import { useEffect, useState } from 'react';

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getAllArticles = async () => {
      const { data } = await articleServices.getAllArticles();
      setArticles(data.data);
    };
    getAllArticles();
  }, []);
  return (
    <>
      <ArticlesView articles={articles} />
    </>
  );
};

export default ArticlePage;
