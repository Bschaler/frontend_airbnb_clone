import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {makeSpot} from '../../store/spots';
import '.CreateSpotForm.css';

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
    image4: ''
});
}