import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import SearchResults from './SearchResults';
import {showProfiles} from '../../store/profile'
import './SearchBar.css'

   const SearchBar = () => {
      const dispatch = useDispatch()
      const [results, setResults] = useState(null)
      const [query, setQuery] = useState('')
      const [value, setValue] = useState('')
      const history = useHistory()

      let profiles = useSelector((state) => state.profile.profiles)
      if (profiles) {
         profiles = profiles['profile']
      }

      const goBack = (e) => {
         history.push('/')
      }
      
      const search = (e) => {
         e.preventDefault()
         let searchResults = []
         profiles.forEach((profile) => {
            let names = []
            profile.common_names.forEach((name) => {
               names.push(...name.toLowerCase().split(' '))
               names.push(...profile.genus_species.toLowerCase().split(' '))
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
               <div style={{background: 'white'}} >
                  <SearchResults results={results}/>
               </div>
            )}
           </div>
           <button 
           type='button'
           onClick={goBack}
           >Back
            </button>
         </div>
         )
      } else {
         return (
            <h1>...loading</h1>
         )
      }
      }

      export default SearchBar