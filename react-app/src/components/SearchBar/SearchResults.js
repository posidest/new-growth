import React from 'react';
import {Link} from 'react-router-dom';
import '../PlantProfiles/PlantProfiles.css'

const SearchResults = ({results}) => {
      
   // if (results) {
      return (
         <>
         <div className='profiles-page'>
            {results.length < 1 && (
               <div>
                  <h4>There are no plants associated with that name.</h4>
               </div>
            )}
            {results.map((result) => (
               <div key={result.id} className='individual-profile'>
                  <Link to={`/plants/profile/${result.id}`}>
                     <h4>{result.genus_species}</h4>
                     <img src={result.picture}
                     alt='picture' />
                     <h4>{result.common_names[0]}</h4>
                  </Link>
               </div>
               ))}
            </div>
            </>
            )
   // } else {
   //    return <h1>loading...</h1>
   // }
}

export default SearchResults