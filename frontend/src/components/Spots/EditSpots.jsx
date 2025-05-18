import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetail, editSpot } from '../../store/spots';
import './Spots.css';

function EditSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const user = useSelector(state => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    price: '',
    previewImage: '',
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  });

  useEffect(() => {
    //console.log("Fetching spot details for editing...");
    dispatch(fetchSpotDetail(spotId))
      .then(() => {
        setIsLoading(false);
       // console.log("Got spot details!");
      })
      .catch(error => {
        console.log("Error getting spot details:", error);
        setIsLoading(false);
      });
  }, [dispatch, spotId]);
  
  useEffect(() => {
    if (spot) {
      console.log("Setting form values from spot:", spot);
      
      const editedSpots = {
        name: spot.name || '',
        description: spot.description || '',
        address: spot.address || '',
        city: spot.city || '',
        state: spot.state || '',
        country: spot.country || '',
        price: spot.price || '',
        previewImage: '',
        image1: '',
        image2: '',
        image3: '',
        image4: ''
      };
      if (spot.SpotImages && spot.SpotImages.length > 0) {

        for (let img of spot.SpotImages) {
          if (img.preview === true) {
            editedSpots.previewImage = img.url;
            break; 
          }
        }
        
        let imageCount = 1;
        for (let img of spot.SpotImages) {
          if (!img.preview && imageCount <= 4) {
            editedSpots['image' + imageCount] = img.url;
            imageCount++;
          }
        }
      }
      setFormData(editedSpots);
    
}
  }, [spot]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  if (isLoading) return <div>Loading spot details...</div>;
  
  if (!user || (spot && spot.ownerId !== user.id)) {
    navigate('/');
    return null;
  }

  const validateImageUrl = (url) => {
    if (!url) return true; 
    
    if (url.toLowerCase().endsWith('.png')) return true;
    if (url.toLowerCase().endsWith('.jpg')) return true;
    if (url.toLowerCase().endsWith('.jpeg')) return true;
    
    return false;
  };
  
  const checkFormErrors = () => {
    const formErrors = {};
    
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.description) {
      formErrors.description = "Description is required";
    } else if (formData.description.length < 30) {
      formErrors.description = "Description needs 30 or more characters";
    }
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.country) formErrors.country = "Country is required";
    if (!formData.price) {
      formErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      formErrors.price = "Price must be a positive number";
    }

    if (!formData.previewImage) {
        formErrors.previewImage = "Preview image is required";
      } else if (!validateImageUrl(formData.previewImage)) {
        formErrors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
      }
      
      if (formData.image1 && !validateImageUrl(formData.image1)) {
        formErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (formData.image2 && !validateImageUrl(formData.image2)) {
        formErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (formData.image3 && !validateImageUrl(formData.image3)) {
        formErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (formData.image4 && !validateImageUrl(formData.image4)) {
        formErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    return formErrors;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form...");
    
    const formErrors = checkFormErrors();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      console.log("Form has errors:", formErrors);
      return;
    }
    
    const spotData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      lat: spot.lat || 37.7645358,
      lng: spot.lng || -122.4730327,
      price: parseFloat(formData.price)
    };
    
    try {
      // console.log("Updating spot:", spotData);
      const updatedSpot = await dispatch(editSpot(spotId, spotData));
       console.log("Spot successfully updated:", updatedSpot);

       if (formData.previewImage) {
        console.log("Adding preview image:", formData.previewImage);
        
        try {
          const imageResponse = await fetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: formData.previewImage,
              preview: true
            })
          });
          
          if (!imageResponse.ok) {
            console.error("Failed to add preview image");
          } else {
            console.log("Preview image added successfully");
          }
        } catch (e) {
          console.error("Error adding preview image:", e);
        }
      }
      
      const additionalImages = [
        formData.image1,
        formData.image2,
        formData.image3,
        formData.image4
      ].filter(img => img);
      
      for (let i = 0; i < additionalImages.length; i++) {
        const img = additionalImages[i];
        try {
          const response = await fetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: img,
              preview: false
            })
          });
          
          if (!response.ok) {
            console.error(`Failed to add image ${i+1}`);
          } else {
            console.log(`Image ${i+1} added successfully`);
          }
        } catch (e) {
          console.error(`Error adding image ${i+1}:`, e);
        }
      }
  
      
      navigate(`/spots/${updatedSpot.id}`);
    } catch (error) {
      
        console.log("Error updating spot:", error);
      
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ form: 'Failed to update spot. Please try again.' });
      }
    }
  };

      
    
  
  return (
    <div className="edit-spot-container">
      <h1>Update your Rental</h1>
      
      <form onSubmit={handleSubmit}>

      <section className="form-section">
          <h2>Update rental details</h2>
          <div className="form-group">
            <label htmlFor="name">Rental Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
        
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your spot (min 30 characters)"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
        </section>
        
        <section className="form-section">
          <h2>Update address</h2>
         
        <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            {errors.state && <div className="error">{errors.state}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            {errors.country && <div className="error">{errors.country}</div>}
          </div>
        </section>
        
       
        <section className="form-section">
          <h2>Update price</h2>
          <div className="form-group">
            <label htmlFor="price">Price per night (USD)</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
        </section>
        
        
        <section className="form-section">
          <h2>Update photos of rental</h2>
          <p>Please provide URLs ending with .png, .jpg, or .jpeg</p>
          
          <div className="form-group">
            <label>Preview Image URL (required)</label>
            <input
               type="text"
               id="previewImage"
               name="previewImage"
              value={formData.previewImage}
              onChange={handleInputChange}
              placeholder="Preview Image URL (.png, .jpg, or .jpeg)"
            />
            {errors.previewImage && <div className="error">{errors.previewImage}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image1">Image URL</label>
            <input
              type="text"
              id="image1"
              name="image1"
              value={formData.image1}
              onChange={handleInputChange}
              placeholder="Image URL (optional)"
            />
            {errors.image1 && <div className="error">{errors.image1}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image2">Image URL</label>
            <input
              type="text"
              id="image2"
              name="image2"
              value={formData.image2}
              onChange={handleInputChange}
              placeholder="Image URL (optional)"
            />
            {errors.image2 && <div className="error">{errors.image2}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image3">Image URL</label>
            <input
              type="text"
              id="image3"
              name="image3"
              value={formData.image3}
              onChange={handleInputChange}
              placeholder="Image URL (optional)"
            />
            {errors.image3 && <div className="error">{errors.image3}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image4">Image URL</label>
            <input
              type="text"
              id="image4"
              name="image4"
              value={formData.image4}
              onChange={handleInputChange}
              placeholder="Image URL (optional)"
            />
            {errors.image4 && <div className="error">{errors.image4}</div>}
          </div>
        </section>
        
        {errors.form && <div className="form-error">{errors.form}</div>}
        
        <div className="form-submit">
          <button type="submit" className="submit-button">
            Update Spot
          </button>
        </div>
      </form>
    </div>
  );
}


export default EditSpotForm;