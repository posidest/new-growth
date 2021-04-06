import React, {useState} from 'react';
import SearchBar from './index'
import SearchResults from './SearchResults'

const SearchPage = () => {
   const [results, setResults] = useState(null)


   return (
      <div>
      <SearchBar />
      <SearchResults results={results}/>
      </div>
   )
}


export default SearchPage