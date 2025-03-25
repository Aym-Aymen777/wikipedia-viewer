import React, { useState } from 'react';
import './app.css';

const WikipediaSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchWikipedia = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    setSearchResults(data.query.search);
  };

  const getRandomArticle = async () => {
    const response = await fetch(
      'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=info&inprop=url&format=json&origin=*'
    );
    const data = await response.json();
    const pageId = Object.keys(data.query.pages)[0];
    const randomArticle = data.query.pages[pageId];
    window.open(randomArticle.fullurl, '_blank');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 search-container">
          <h1>Wikipedia Viewer</h1>
          <div className="search-wrapper">
            <form onSubmit={searchWikipedia}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="button-wrapper">
                <button type="submit" className="search-button">Search</button>
                <button 
                  type="button" 
                  onClick={getRandomArticle} 
                  className="random-button"
                >
                  Random
                </button>
              </div>
            </form>
          </div>

          <div className="results-container">
            {searchResults.map((result) => (
              <a 
                key={result.pageid}
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
              >
                <div className="result-item">
                  <h3>{result.title}</h3>
                  <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikipediaSearchApp;