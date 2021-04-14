import React from 'react';
import {Link} from 'react-router-dom';
import '../PlantProfiles/PlantProfiles.css'

const SearchResults = ({results}) => {
      
   // if (results) {
      return (
         <>
         <div className='results-page'>
            {results.length < 1 && (
               <div>
                  <h4>There are no plants associated with that name.</h4>
               </div>
            )}
            <div className='results'>
               {results.map((result) => (
                  <div key={result.id} className='individual-result'>
                     <Link to={`/plants/profile/${result.id}`}>
                        <h5>{result.genus_species}</h5>
                        <div 
                        className='result-img'
                        style={{height: '200px', width: '200px'}}>
                           <img src={result.picture}
                           style={{maxWidth: '200px', maxHeight: '200px'}}
                           alt='picture' />
                        </div>
                        <h5>{result.common_names[0]}</h5>
                     </Link>
                  </div>
                  ))}
               </div>
            </div>
            </>
            )
   // } else {
   //    return <h1>loading...</h1>
   // }
}

export default SearchResults