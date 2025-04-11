import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const start = (page - 1) * limit;
  const currentItems = items.slice(start, start + limit);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Fetched Posts</h2>

      {currentItems.map(item => (
        <div key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={start + limit >= items.length}>Next</button>
      </div>
    </div>
  );
}

export default App;
