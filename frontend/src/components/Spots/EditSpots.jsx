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
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  

  useEffect(() => {
    console.log("Fetching spot details for editing...");
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
      setName(spot.name || '');
      setDescription(spot.description || '');
      setAddress(spot.address || '');
      setCity(spot.city || '');
      setState(spot.state || '');
      setCountry(spot.country || '');
      setPrice(spot.price || '');
    }
  }, [spot]);
  
  if (isLoading) return <div>Loading spot details...</div>;
  
  if (!user || (spot && spot.ownerId !== user.id)) {
    navigate('/');
    return null;
  }
  
  const checkFormErrors = () => {
    const formErrors = {};
    
    if (!name) formErrors.name = "Name is required";
    if (!description) {
      formErrors.description = "Description is required";
    } else if (description.length < 30) {
      formErrors.description = "Description needs 30 or more characters";
    }
    if (!address) formErrors.address = "Address is required";
    if (!city) formErrors.city = "City is required";
    if (!state) formErrors.state = "State is required";
    if (!country) formErrors.country = "Country is required";
    if (!price) {
      formErrors.price = "Price is required";
    } else if (isNaN(price) || Number(price) <= 0) {
      formErrors.price = "Price must be a positive number";
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
      name,
      description,
      address,
      city,
      state,
      country,
      lat: spot.lat || 37.7645358,
      lng: spot.lng || -122.4730327,
      price: parseFloat(price)
    };
    
    try {
      // console.log("Updating spot:", spotData);
      const updatedSpot = await dispatch(editSpot(spotId, spotData));
      // console.log("Spot successfully updated:", updatedSpot);
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
      <h1>Update your Spot</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Spot Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe your spot (min 30 characters)"
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        
        <section className="form-section">
          <h2>Where is your rental located?</h2>
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
            {errors.state && <div className="error">{errors.state}</div>}
          </div>
          
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            {errors.country && <div className="error">{errors.country}</div>}
          </div>
        </section>
        
        <section className="form-section">
          <h2>Set price for your rental</h2>
          <div className="form-group">
            <label>Price per night (USD)</label>
            <input
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
        </section>
        
        {errors.form && <div className="form-error">{errors.form}</div>}
        
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
}

export default EditSpotForm;