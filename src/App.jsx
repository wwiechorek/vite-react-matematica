import { useState } from 'react'
import './App.css'
import Tabuada from './Tabuada'

function App() {
  const [level, setLevel] = useState(null)
  return (
    <div className="App">
      {level === null ? (
        <div className='levels'>
          <button onClick={() => setLevel([2, 3, 4, 5])}>Level 1</button>
          <button onClick={() => setLevel([6, 7, 8, 9])}>Level 2</button>
          <button onClick={() => setLevel([2, 3, 4, 5, 6, 7, 8, 9])}>Level 3</button>
          <button onClick={() => setLevel([1, 2, 3, 4, 5, 6, 7, 8, 9])}>Level 4</button>
        </div>
      ) : (
        <Tabuada back={() => setLevel(null)} numbers={level} />
      )}
    </div>
  )
}

export default App
