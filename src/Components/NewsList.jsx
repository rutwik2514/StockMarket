import React from 'react'

export default function NewsList({articles}) {
  return (
    <div>
      {articles.map((article, index) => (
          <div key={index} className="bg-[#d8c5e4] m-5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl bg-[#d8c5e4]  font-extrabold mb-2">{article.title}</h2>
            <p className="text-gray-700 bg-[#d8c5e4] mb-4">{article.description}</p>
            <a
              href={article.url}
              className="text-blue-500 bg-[#d8c5e4] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        ))}
    </div>
  )
}
