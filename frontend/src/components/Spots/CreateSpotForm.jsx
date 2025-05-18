import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {makeSpot} from '../../store/spots';
import { useSelector } from 'react-redux';
import './Spots.css';
//import { FaProjectDiagram } from 'react-icons/fa';

function CreateSpotForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    console.log("Current session user:", sessionUser);
    
const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city : '',
    state: '',
    country: '',
    price: '',
    lat: 37.7749,
    lng: -122.4194,
    previewImage: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    image7: '',
    image8: '',
    image9: ''
});



const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const formDataUpdate = (event) => {
    const { name, value} = event.target;
    console.log(`updating ${name} field to: ${value}`);
   

    setFormData({...formData, [name]: value});
};

const validateImageUrl = (url) => {
    const imgType = ['.png', '.jpg', '.jpeg'];
    return imgType.some(ext => url.toLowerCase().includes(ext));
};

const checkFormErrors = () => {
    console.log("checking for any errors");
    
    const formErrors = {};

    if (!formData.description) {
        formErrors.description = "Description is required";
    } else if (formData.description.length < 30) {
        formErrors.description = "Description needs 30 or more characters";
    }
   
    if (!formData.address) formErrors.address = "Address is required";
    if(!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.country) formErrors.country = "Country is required";


    if (!formData.previewImage) {
        formErrors.previewImage = "Preview image is required";
    } else if (!validateImageUrl(formData.previewImage)) {
        formErrors.previewImage = "Image must be .png, .jpg(or .jpeg)";
    }

    if (!formData.name) formErrors.name = "Name is required";
    
    if (!formData.price) {
        formErrors.price = "Price is required";
    } else if (isNaN(formData.price)) {
        formErrors.price = "Price must be a number";
    } else if (Number(formData.price) <= 0) {
        formErrors.price = "Price must be greater than zero";
    }
    
    return formErrors;
};

const submitForm = async (event) => {
    event.preventDefault();
    console.log("submitting form:", formData);
    
    const formErrors = checkFormErrors();
    setErrors(formErrors);
console.log("errors:", formErrors)

if (Object.keys(formErrors).length > 0) {
    console.log("ERROR! Cannot submit form");
    return;
}
setIsSubmitting(true);


const spotData = {
    name: formData.name,
    description: formData.description,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    price: parseFloat(formData.price),
    lat: parseFloat(formData.lat),
    lng: parseFloat(formData.lng),
    previewImage: formData.previewImage,
    images: [
        formData.image1,
        formData.image2,
        formData.image3,
        formData.image4,
        formData.image5,
        formData.image6,
        formData.image7,
        formData.image8,
        formData.image9],

        //TODO need to get rid of slots if not in use
};

try {
    const newSpot = await dispatch(makeSpot(spotData));
    console.log("API Response for new spot:", newSpot);
    if (newSpot.id) {

        try {
            const previewResponse = await fetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: formData.previewImage,
                    preview: true
                })
            });
            
            if (!previewResponse.ok) {
                console.error("Failed to add preview image");
            }
        } catch (e) {
            console.error("Error adding preview image:", e);
        }

        const additionalImages = [
            formData.image1,
            formData.image2,
            formData.image3,
            formData.image4,
            formData.image5,
            formData.image6,
            formData.image7,
            formData.image8,
            formData.image9
        ].filter(img => img);

        for (let i = 0; i < additionalImages.length; i++) {
            const img = additionalImages[i];
            try {
                await fetch(`/api/spots/${newSpot.id}/images`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: img,
                        preview: false
                    })
                });
            } catch (error) {
                console.error(`Error adding image`, error);
            }
        }

    navigate(`/spots/${newSpot.id}`);
} else {
    setErrors({ form: 'Failed to create the spot. Please try again.' });
    setIsSubmitting(false);
        }

    } catch (error) {
    console.log("Error creating spot:", error);
    
    setIsSubmitting(false);

    if (error.errors) {
        setErrors(error.errors);
    } else {
        setErrors({ form: 'Failed to create the spot. Please try again.' });
    }
}
};

return (
<div className = "create-spot-container">
    <h1>Create a New Spot</h1>


<form onSubmit = {submitForm}>
    

     <section className="form-section">
                    <h2>Where is your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                  
                    <div className="form-group">
             <label htmlFor="address">Street Address</label>
                 <input
                     type="text"
                     id="address"
                    name="address"
                    value={formData.address}
                     onChange={formDataUpdate}
                       placeholder="Address"/>
                          {errors.address && <div className="input-error">{errors.address}</div>}
                       </div>
                      
             <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                      type="text"
                      id="city" 
                      name="city"
                      value={formData.city} 
                      onChange={formDataUpdate}
                      placeholder="City"/> 
                {errors.city && <div className="input-error">{errors.city}</div>}
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'state'>State/Province</label> {/* Changed label text inconsistently */}
                <input type='text' 
                id='state' 
                name='state' 
                value = {formData.state} 
                onChange = {formDataUpdate} 
                placeholder='State'/>
                {errors.state && <div className='input-error'>{errors.state}</div>}
            </div>
           
            <div className="form-group">
                    
                <label htmlFor="country">Country</label>
                <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={formDataUpdate}
                        placeholder="Country"/> 
                        {errors.country && <div className="input-error">{errors.country}</div>}
                    </div>
                    
                       </section>

     <section className="form-section">
          <h2>Describe your place to guests</h2>
         
          <div className="form-group">         
            <label htmlFor="name">Spot Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={formDataUpdate}
                placeholder="Spot Name"
            />
            {errors.name && <div className="input-error">{errors.name}</div>}
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={formDataUpdate}
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
                            value={formData.price}
                            onChange={formDataUpdate}
                            placeholder="Price"/>
                        {errors.price && <div className="input-error">{errors.price}</div>}
                    </div>
                </section>

                <section className="form-section">
                    <h2>Add images of your rental</h2>
                    <div className="form-group">
                        <label htmlFor="previewImage">Preview Image URL</label>
                        <input
                            type="text"
                            id="previewImage"
                            name="previewImage"
                            value={formData.previewImage}
                            onChange={formDataUpdate}
                            placeholder="Preview Image URL (.png, .jpg, or .jpeg)"/>
                        {errors.previewImage && <div className="input-error">{errors.previewImage}</div>}
                    </div> 
                    <div className="form-group">
    
                        <label htmlFor="image1">First Additional Image</label>
                            <input
                                type="text"
                                 id="image1"
                                name="image1"
                                 value={formData.image1}
                                 onChange={formDataUpdate}
                                 placeholder="Image URL (optional)"
                                 />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image2">Second Additional Image</label>
                        <input
                             type="text"
                             id="image2"
                             name="image2"
                            value={formData.image2}
                            onChange={formDataUpdate}
                            placeholder="Image URL (optional)"
                            />
                    </div>


        {/* TODO: refactor this later? */}
        {['image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9'].map((extraImage, idx) => {
    return (
        <div className="form-group" key={extraImage}>
            <label htmlFor={extraImage}>Additional Image {idx + 3}</label>
            <input
                type="text"
                id={extraImage}
                name={extraImage}
                value={formData[extraImage]}
                onChange={formDataUpdate}
                placeholder="Image URL (optional)"
            />
        </div>
    )
})}
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
