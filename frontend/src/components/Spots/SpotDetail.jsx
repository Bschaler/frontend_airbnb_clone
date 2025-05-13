import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetail } from '../../store/spots'; 


function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const spot = useSelector(state => state.spots.singleSpot);
    
    useEffect(() => {
        const getSpot = async () => {
            try {
                await dispatch(fetchSpotDetail(spotId));
                setLoading(false);
                console.log("Got the spot!");
            } catch (error) {
                console.log("Ugh, something went wrong", error);
                setErr("Couldn't load spot. Maybe try again?");
                setLoading(false);
            }
        };
        getSpot();
    }, [spotId, dispatch]);

    if (loading) return <div>LOADING...</div>
    if (err) return <div>{err}</div>
    if (!spot) return <div>No spot found...</div>;
}

export default SpotDetail;