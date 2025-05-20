import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {makeSpot} from '../../store/spots';
//import { useSelector } from 'react-redux';
import './Spots.css';
import { csrfFetch } from '../../store/csrf';
//import { FaProjectDiagram } from 'react-icons/fa';

function CreateSpotForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const sessionUser = useSelector(state => state.session.user);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
   




const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);


const handleChange = (e) => {
    const {name, value} = e.target;
    // console.log("input changed:", name, value);
    
    // update the right state based on input name
    if (name === 'name') setName(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'address') setAddress(value);
    else if (name === 'city') setCity(value);
    else if (name === 'state') setState(value);
    else if (name === 'country') setCountry(value);
    else if (name === 'price') setPrice(value);
    else if (name === 'previewImg') setPreviewImg(value);
    else if (name === 'img1') setImg1(value);
    else if (name === 'img2') setImg2(value);
    else if (name === 'img3') setImg3(value);
    else if (name === 'img4') setImg4(value);
};

function checkImage(url) {
    if(!url) return false;
    return url.toLowerCase().endsWith('.png') || 
           url.toLowerCase().endsWith('.jpg') || 
           url.toLowerCase().endsWith('.jpeg');
}
const validate = () => {
    const errors = {};

    if(!name) errors.name = "Name is required";
        
        if(!description) {
            errors.description = "Description is required";
        } else if(description.length < 30) {
            errors.description = "Description needs at least 30 characters";
        }
        
        if(!address) errors.address = "Address is required";
        if(!city) errors.city = "City is required";
        if(!state) errors.state = "State is required";
        if(!country) errors.country = "Country is required";
        
        if(!price) {
            errors.price = "Price is required";
        } else if(isNaN(price)) {
            errors.price = "Price must be a number";
        } else if(Number(price) <= 0) {
            errors.price = "Price must be greater than 0";
        }
        
        if(!previewImg) {
            errors.previewImg = "Preview image is required";
        } else if(!checkImage(previewImg)) {
            errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
        }
        
        
        return errors;
    };
  

const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submitting...");
  
    const formErrors = validate();
    setErrors(formErrors);

if (Object.keys(formErrors).length > 0) {
   // console.log("ERROR! Cannot submit form");
    return;
}
setIsSubmitting(true);


const spotData = {
    name,
    description,
    address,
    city,
    state, 
    country,
    lat: 37.7645358, 
    lng: -122.4730327, 
    price: parseFloat(price),
    previewImage: previewImg
};
try {
 
    const spot = await dispatch(makeSpot(spotData));
    console.log("created spot:", spot);
    
    if(spot && spot.id) {
  
        try {
            await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    url: previewImg,
                    preview: true
                })
            });
            
            
            
            const images = [img1, img2, img3, img4].filter(img => img);
            
            for(let i = 0; i < images.length; i++) {
                try {
                    await csrfFetch(`/api/spots/${spot.id}/images`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                           
                        },
                        body: JSON.stringify({
                            url: images[i],
                            preview: false
                        })
                    });
                } catch(e) {
                    console.log(`error adding image ${i+1}:`, e);
                   
                }
            }
            

            navigate(`/spots/${spot.id}`);
        } catch(err) {
            console.log("error adding images:", err);
           
            navigate(`/spots/${spot.id}`);
        }
    }
} catch(err) {
    console.log("failed to create spot:", err);
    setIsSubmitting(false);
    
    setErrors({
        form: "Something went wrong creating your spot"
    });
}
};


return (
<div className = "create-spot-container">
    <h1>Create a New Spot</h1>


<form onSubmit = {handleSubmit}>
    

     <section className="form-section">
                    <h2>Where is your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                  
                    <div className="form-group">
             <label htmlFor="address">Street Address</label>
                 <input
                     type="text"
                     id="address"
                    name="address"
                    value={address}
                     onChange={handleChange}
                       placeholder="Address"/>
                          {errors.address && <div className="input-error">{errors.address}</div>}
                       </div>
                      
             <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                      type="text"
                      id="city" 
                      name="city"
                      value={city} 
                      onChange={handleChange}
                      placeholder="City"/> 
                {errors.city && <div className="input-error">{errors.city}</div>}
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'state'>State/Province</label> 
                <input type='text' 
                id='state' 
                name='state' 
                value = {state} 
                onChange = {handleChange} 
                placeholder='State'/>
                {errors.state && <div className='input-error'>{errors.state}</div>}
            </div>
           
            <div className="form-group">
                    
                <label htmlFor="country">Country</label>
                <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        onChange={handleChange}
                        placeholder="Country"/> 
                        {errors.country && <div className="input-error">{errors.country}</div>}
                    </div>
                    
                       </section>

     <section className="form-section">
          <h2>Describe your rental</h2>
         
          <div className="form-group">         
            <label htmlFor="name">Rental Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Rental name..."
            />
            {errors.name && <div className="input-error">{errors.name}</div>}
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Describe your spot (min 30 characters)"
            />
            {errors.description && <div className="input-error">{errors.description}</div>}
        </div>
    </section>


            <section className="form-section">
                <h2>Set price for your rental</h2>
                    <div className="form-group">
                        <label htmlFor="price">Price per night (USD)</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={price}
                            onChange={handleChange}
                            placeholder="Price"/>
                        {errors.price && <div className="input-error">{errors.price}</div>}
                    </div>
                </section>

                <section className="form-section">
                    <h2>Add images of your rental</h2>
                    <div className="form-group">
                        <label htmlFor="previewImg">Preview Image URL</label>
                        <input
                            type="text"
                            id="previewImg"
                            name="previewImg"
                            value={previewImg}
                            onChange={handleChange
                            }
                            placeholder="Preview Image URL (.png, .jpg, or .jpeg)"/>
                        {errors.previewImg && <div className="input-error">{errors.previewImg}</div>}
                    </div> 
                    <div className="form-group">
    
                        <label htmlFor="img1">Image 1</label>
                            <input
                                type="text"
                                 id="img1"
                                name="img1"
                                 value={img1}
                                 onChange={handleChange}
                                 placeholder="Image URL (optional)"
                                 />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image2">Image 2</label>
                        <input
                             type="text"
                             id="img2"
                             name="img2"
                            value={img2}
                            onChange={handleChange}
                            placeholder="Image URL (optional)"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="img3">Image 3</label>
                        <input
                            type="text"
                            id="img3"
                            name="img3"
                            value={img3}
                            onChange={handleChange}
                            placeholder="Image URL (optional)"
                        />
                    </div>

                     
                    <div className="form-group">
                        <label htmlFor="img4">Image 4</label>
                        <input
                            type="text"
                            id="img4"
                            name="img4"
                            value={img4}
                            onChange={handleChange}
                            placeholder="Image URL (optional)"
                        />

        </div>
 
</section>


            <div className='form-submit'>
                <button
                    type = "submit"
                    className = "submit-button"
                    >
                         {isSubmitting ? 'Creating...' : 'Create New Rental!'}
                </button>

            </div>
  </form>     
</div>

// TODO PRICE, PREVIEW IMAGES,
// CREATE A SUBMIT BUTTON

);
}
 
export default CreateSpotForm;
