import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchResults from './SearchResults';
import {showProfiles} from '../../store/profile'
import './SearchBar.css'

   const SearchBar = () => {
      const dispatch = useDispatch()
      const [results, setResults] = useState(null)
      const [query, setQuery] = useState('')
      const [value, setValue] = useState('')
      let profiles = useSelector((state) => state.profile.profiles)
      if (profiles) {
         profiles = profiles['profile']
      }
      
      const search = (e) => {
         e.preventDefault()
         let searchResults = []
         profiles.forEach((profile) => {
            let names = []
            profile.common_names.forEach((name) => {
               names.push(...name.toLowerCase().split(' '))
            })
            if (names.includes(value[0]) || names.includes(value[1])) {
               searchResults.push(profile)
            }
         })
         
         setResults(searchResults)
         return results;
      }

      useEffect(() => {
         dispatch(showProfiles())
      },[])

      const updateSearch = (e) => {
         setQuery(e.target.value)
         setValue(e.target.value.toLowerCase().split(' '))
      }

      if (profiles) {
         return (
         <div className='search-page'>
           <form onSubmit={search}>
             <div className='search'>
               <input type='text'
               value={query}
               onChange={updateSearch}
               placeholder='search common plant names'
               />
               <button type='submit'>
               <i className="fas fa-search"></i>
               </button>
             </div>
           </form>
           <div>
            {results && (
               <div>
                  <SearchResults results={results}/>
               </div>
            )}
           </div>
         </div>
         )
      } else {
         return (
            <h1>...loading</h1>
         )
      }
      }

      export default SearchBar