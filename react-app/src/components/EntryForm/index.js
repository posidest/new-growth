import React, {useState, useEffect} from 'react';
import {useParams, Redirect, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {showPlant} from '../../store/plant'
import {createEntry} from '../../store/entry'
import './EntryForm.css'

const EntryForm = () => {
   const [entry, setEntry] = useState({})
   const [plantId, setPlantId] = useState('')
   const [watered, setWatered] = useState(false)
   const [date, setDate] = useState(null)
   const [fertilized, setFertilized] = useState(false)
   const [location, setLocation] = useState('')
   const [details, setDetails] = useState('')
   const [imageLoading, setImageLoading] = useState(false)
   const [progressPic, setProgressPic] = useState(null)
   const {id} = useParams()
   const dispatch = useDispatch()
   const history = useHistory()   
   console.log(id, 'this is the id from the entry form')

   useEffect(() => {
      dispatch(showPlant(id))
   })

   const plant = useSelector((state) => state.plant.currentPlant)

   const postEntry = (e) => {
      e.preventDefault()
      const newEntry = {
         'plant_id': id, 
         'watered': watered, 
         'fertilized': fertilized,
         'date': date, 
         'location': location, 
         'details': details, 
         'progress_pic': progressPic
      }
      console.log(newEntry)
      const res = dispatch(createEntry(newEntry))
      console.log(res, 'res from entry form')
      setEntry(res)
      history.push(`/plants/${id}`)
      // return <Redirect to={`/plants/${plantId}`} />
   }

   const updateWatered = (e) => {
      if (watered) {
         setWatered(false)
      } else {
         setWatered(true)
      }
   }

   const updateFertilized = (e) => {
      if (fertilized) {
         setFertilized(false)
      } else {
         setFertilized(true)
      }
   }

   const updateLocation = (e) => {
      setLocation(e.target.value)
   }


    const updateDetails = (e) => {
      setDetails(e.target.value)
   }

   const updateDate = (e) => {
      setDate(e.target.value)
   }

    const updateProgressPic = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData();
    formData.append("image", image);
    setImageLoading(true);
    const res = await fetch('/api/images', {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const json = await res.json();
        await setProgressPic(json.url)
        setEntry({...entry, 'progress_pic': progressPic})
        setImageLoading(false);
    }
    else {
       console.log("Something went wrong");
       setImageLoading(false);
        return (
            <p style={{color: 'red'}}>
                There was an error with your upload. Please try again.
            </p>
        )
      }
    };

    if (plant) {
       console.log(plant)
      return (
         <div className='entry-form-page' style={{background: `url(${plant.plant_pic}) center no-repeat`, backgroundSize: 'cover', height: '900px'}}>
            <div className='entry-form'>
            <h1>{plant.nickname}</h1>
               <form onSubmit={postEntry}>
                  <div>
                     <label className='file-input'>
                        <input
                        type='file'
                        accept='image/*'
                        name='plant-pic'
                        onChange={updateProgressPic}/>
                     Upload a Progress Picture
                     </label>
                        {(imageLoading) && <p>Loading...</p>}
                        <div className='progress-pic'>
                           <img src={progressPic}
                           style={{width: '200px'}}
                           />
                        </div>
                     </div>
                  <div className='watered'>
                     <label>Watered?</label>
                     <input 
                     type='checkbox'
                     // value={watered}
                     onClick={updateWatered}/>
                  </div>
                  <div className='fertilized'>
                     <label>Fertilized?</label>
                     <input
                     type='checkbox'
                     // value={fertilized}
                     onClick={updateFertilized}/>
                  </div>
                  <div>
                     <input
                     type='date'
                     onChange={updateDate}
                     value={date}/>
                  </div>
                  <div>
                     <input
                     type='text'
                     value={location}
                     placeholder='Location'
                     onChange={updateLocation}/>
                  </div>
                  <div>
                     <textarea
                     value={details}
                     placeholder='Details...'
                     onChange={updateDetails}
                     />
                  </div>
                  <div>
                     <button type='submit'>
                        Add Entry
                     </button>
                  </div>
               </form>
         </div>
      </div>
      )
    } else {
       return (
          <h1>loading...</h1>
       )
    }
}



export default EntryForm