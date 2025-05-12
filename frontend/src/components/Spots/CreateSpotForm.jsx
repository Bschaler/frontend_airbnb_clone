import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {makeSpot} from '../../store/spots';
import './Spots.css';
import { FaProjectDiagram } from 'react-icons/fa';

function CreateSpotForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city : '',
    state: '',
    country: '',
    price: '',
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

console.log("rendering form");

const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const formDataUpdate = (event) => {
    const { name, value} = event.target;
    setFormData({...formData, [name]: value});
};

const checkFormErrors = () => {
    console.log("checking errors");
    
    const formErrors = {};

    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.description) {
        formErrors.description = "Description is required";
    } else if (formData.description.length < 30) {
        formErrors.description = "Description needs 30 or more characters";
    };
    if (!formData.address) formErrors.address = "Address is required";
    if(!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.country) formErrors.country = "Country is required";
    
    if (!formData.previewImage) {
        formErrors.previewImage = "Preview image is required";
    }
    
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
    
    navigate(`/spots/${newSpot.id}`);
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
<section className ="form-section">
                <h2>Where's your rental located?</h2>
                <p>No need to worry! Guests will not have access to address until reservation is complete!</p>
                
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

                    <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={formDataUpdate}
                        placeholder="Address"
                    />
                       </div>
                       </section>
  </form>     
</div>

);
}

export default CreateSpotForm;
