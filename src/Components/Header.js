

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsList from './NewsList';
import Pagination from './Pagination';
import Loader from '../Utilis/Loader/Loader';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [postPerPage,setPostPerPage]=useState(3);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=finance&from=2024-06-13&sortBy=publishedAt&apiKey=e255d757ed5a44e7a64b2e646abe5fca')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const lastPostIndex=currentPage*postPerPage;
  const firstPostIndex=lastPostIndex-postPerPage;
  const currentPosts=articles.slice(firstPostIndex,lastPostIndex);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-5xl flex items-center text-[#52057B] justify-center font-bold mb-4">Latest Articles</h1>
      <div className="flex-col">
        <center>{articles.length==0 && <Loader />}</center>
        <NewsList  articles={currentPosts} />
        <Pagination
                totalPosts={articles.length<40?articles.length:40}
                postsPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
      </div>
    </div>
  );
};

export default ArticleList;




