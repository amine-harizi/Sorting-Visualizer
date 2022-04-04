
import { useState, useEffect } from 'react';
import './App.css';
import Loading from '../src/Components/Loading'
import SortVisualizer from '../src/Components/SortVisualizer'
function App() {
  const definitions = {
    bubble: 'Bubble sort is a pair-based sorting algorithm that is based on the idea of comparing each pair in an array and swap their positions if their order is wrong.',
    selection: 'Selection sort is min/max based sorting algorithm that is based on the idea of selecting the min/max value and swapping it the beginning/end of the array on each pass.',
    insertion: 'Insertion sort is based on repeatedly finding min/max of an array and moving it from the unsorted part and inserting it in the beginning/end of the array.',
    quick: ' Quick sort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.'
  }
  const sorts = [
    'Bubble',
    'Selection',
    'Insertion',
    'Quick',
   ]
  const [sortType, setSortType] = useState(sorts[0])
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])


  const handleSortTypeChange = (e, sort) => {
    e.preventDefault();
    setSortType(sort)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
  return (
    <div className='App'>
      {loading ? <Loading /> :
        <>
          {
            showMenu &&
            <nav className={`nav-bar ${showMenu ? 'show' : 'hide'} `}>
              {sorts.map((sort, index) => <a key={index} className={`nav-link ${sortType === sort && 'active'}`}
                onClick={(e) => handleSortTypeChange(e, sort)}>{sort}</a>)}
            </nav>
          }
          <main className='main-content'>
            <button className='toggle-btn btn' onClick={() => setShowMenu(!showMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1>{sortType} Sort</h1>

            <p className='definition'>{definitions[sortType.toLocaleLowerCase()]}</p>

            <SortVisualizer setShowMenu={setShowMenu} sortType={sortType} />
          </main>
        </>
      }
    </div>
  );
}

export default App;
