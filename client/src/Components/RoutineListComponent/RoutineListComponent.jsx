import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './RoutineListComponent.css'
import { IoIosCreate } from "react-icons/io";
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';
import customFetch from '../../Utils/customFetch';
import { FaSlideshare } from "react-icons/fa";

const RoutineListComponent = () => {
    const [showPopup, setShowPopup] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [all_routines, setAll_Routine] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const togglePopup = () => setShowPopup(!showPopup)
    const toggleShare = () => setShowShare(!showShare)

    const fetchAllRoutine = async () => {
        try {
            const { data } = await customFetch.get('/routines/allroutines');
            setAll_Routine(data.routines);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllRoutine();
    }, []);

    const handleAddRoutine = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        try {
            await customFetch.post('/routines/addroutine', data);
            toast.success('Rutina creada');
            e.target.reset()
            togglePopup()
            fetchAllRoutine()
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleShareRoutine = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const routineId = formData.get('routineId')
        try {
            await customFetch.post('routines/shareRoutine', { routineId });
            toast.success('Rutina compartida');
            e.target.reset()
            toggleShare()
            fetchAllRoutine()
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className="routine-list">
        <div className="routine-list-container">
            {all_routines.map((routines, index) => (
                <Link key={index} to={`/home/routine/${routines._id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className="routine-list-format">
                        <div className="routine-list-format-text">
                            <h1>{routines.name}</h1>
                            <p>{routines.Id}</p>
                        </div>
                        <div className="routine-list-format-logo">
                            <PiBarbellLight size={50} color='0099ff'/>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <div className="routine-addshare">
            <div className="routine-add" onClick={togglePopup}>
                <IoIosCreate size={75} color='0099ff'/>
            </div>
            <div className="routine-share" onClick={toggleShare}>
                <FaSlideshare size={75} color='red'/>
            </div>
        </div>
        <div className={showPopup ? 'routine-popup show-popup' : 'routine-popup'}>
            <div className="popup-content">
                <form onSubmit={handleAddRoutine}>
                    <div className="popup-logo">
                        <PiBarbellLight size={50} color='0099ff'/>
                    </div>
                    <div className="popup-field">
                        <p>Nombre de la rutina</p>
                        <input type="text" name='name' required />
                    </div>
                    <button type='submit' disabled={isSubmitting} className="popup-accept">
                        {isSubmitting ? 'Creando rutina...' : 'CREAR'}
                    </button>
                </form>
                <button onClick={togglePopup} className="popup-accept">CANCELAR</button>
            </div>
        </div>
        <div className={showShare ? 'routine-sharepopup show-share' : 'routine-sharepopup'}>
            <div className="share-content">
                <form onSubmit={handleShareRoutine}>
                    <div className="share-logo">
                        <PiBarbellLight size={50} color='red'/>
                    </div>
                    <div className="share-field">
                        <p>Compartir rutina</p>
                        <input type="text" name='routineId' required />
                    </div>
                    <button type='submit' disabled={isSubmitting} className="share-accept">
                        {isSubmitting ? 'Obteniendo rutina...' : 'OBTENER'}
                    </button>
                </form>
                <button onClick={toggleShare} className="share-accept">CANCELAR</button>
            </div>
        </div>
    </div>
  )
}

export default RoutineListComponent
