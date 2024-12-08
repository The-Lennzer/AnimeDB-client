import React, { useState } from 'react';
import axios from 'axios';
import './QueryExecuter.css';

function QueryExecuter() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/execute-query', { query })
      .then(response => {
        setResults(response.data);
        console.log('something')

      
      })
      .catch(error => {
        console.error('There was an error executing the query!', error);
      });
  };

  const predefinedQueries = [
    'SELECT Genre, AVG(AverageRating) AS AvgRating FROM Anime A JOIN HasGenre HG ON A.animeId = HG.animeId GROUP BY genre HAVING AVG(AverageRating) > 8;',
    'SELECT title, releaseYear, averageRating FROM Anime ORDER BY AverageRating DESC;',
    'SELECT A.Title, D.FirstName, D.LastName FROM Anime A JOIN Director D ON A.pId = D.DirectorId;',
    'SELECT Title, Releaseyear, AverageRating FROM Anime WHERE AverageRating > 8.5 AND (Type = \'Shōnen\' OR Type = \'Isekai\');',
    'SELECT Title, (AverageRating * 10) AS RatingPercentage FROM Anime;',
    'SELECT Title, Plot FROM Anime WHERE Plot LIKE \'%demon%\';',
    'SELECT Title, AverageRating FROM Anime WHERE AverageRating BETWEEN 8.5 AND 10;',
    '(SELECT Title FROM Anime WHERE Type = \'Drama\') UNION (SELECT Title FROM Anime WHERE AverageRating > 8.5);',
    'SELECT Title FROM Anime A WHERE EXISTS (SELECT 1 FROM Reviewing R WHERE R.AnimeIdfk2 = A.AnimeId AND A.averageRating > 8.5);',
    'SELECT title, DATE_FORMAT(releaseYear, \'%Y-%m-%d\') AS Year FROM Anime;',
    'UPDATE productionhouse SET NetWorth = NetWorth * 0.95 WHERE productionHouseID IN (SELECT pID FROM anime WHERE averageRating < 8.5);',
    'UPDATE productionhouse SET NetWorth = NetWorth * 1.05 WHERE productionHouseID IN (SELECT pID FROM anime WHERE averageRating < 8.5);',
    'SELECT ph.Name AS ProductionHouseName, ph.NetWorth, AVG(a.averageRating) AS AverageRating FROM productionhouse ph JOIN anime a ON ph.productionHouseID = a.pID GROUP BY ph.productionHouseID, ph.Name, ph.NetWorth;'
  ];

  const buttonNames = [
    'Aggregate',
    'Order By',
    'Join',
    'BOOLEAN / Logical',
    'Arithmetic Ops',
    'LIKE',
    'BETWEEN',
    'Union',
    'Exists',
    'Date Extract',
    'Set Decrease',
    'Set Increase',
    'Net Worth'
  ];

  const handleButtonClick = (query) => {
    setQuery(query);
  };


  return (
    <div>
      <h1>SQL Query Machine</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter SQL query:
          <textarea value={query} onChange={handleChange} />
        </label>
        <button type="submit">Execute</button>
      </form>
      <div className="query-buttons">
        {predefinedQueries.map((q, index) => (
          <button key={index} onClick={() => handleButtonClick(q)}>
            {buttonNames[index]}
          </button>
        ))}
      </div>
      <h2>Results:</h2>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default QueryExecuter;
