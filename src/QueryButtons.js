import React, { useState } from 'react';
import axios from 'axios';
import './QueryExecuter.css';

function QueryExecuter() {
  const [results, setResults] = useState([]);
  
  // Predefined SQL queries
  const queries = [
    'SELECT * FROM users',
    'SELECT COUNT(*) FROM orders',
    'SELECT * FROM products WHERE price > 100',
    'SELECT * FROM customers WHERE country = "USA"',
    'SELECT * FROM employees ORDER BY name',
    'SELECT * FROM sales WHERE date > "2023-01-01"',
    'SELECT * FROM suppliers WHERE city = "New York"',
    'SELECT * FROM categories',
    'SELECT * FROM shippers WHERE company_name LIKE "A%"',
    'SELECT * FROM regions'
  ];

  const handleQueryExecution = (query) => {
    axios.post('http://localhost:3000/api/execute-query', { query })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('There was an error executing the query!', error);
      });
  };

  return (
    <div>
      <h1>SQL Query Executor</h1>
      <div className="query-buttons">
        {queries.map((query, index) => (
          <button key={index} onClick={() => handleQueryExecution(query)}>
            Execute Query {index + 1}
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
