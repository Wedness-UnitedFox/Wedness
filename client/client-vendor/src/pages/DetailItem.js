import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchServiceById } from '../store/actions/action';

const DetailItem = () => {
    const { service_type, id } = useParams()
    console.log(service_type, id, "params detail")
    const dispatch = useDispatch()
    const history = useHistory()
    const { service, loading } = useSelector(state => state)
    const { 
        name, 
        avatar,
        description, 
        address,
        capacity,
        email,
        phone_number,
        price
    } = service
    
    useEffect(() => {
        console.log(service, 'dalam useEffect detail')
        dispatch(fetchServiceById(id, service_type))
    }, [])
    
    const closeHandler = function () {
        history.push('/home')
    }

    const toEditHandler = function () {
        history.push(`/edit/${service_type}/${id}`)
    }

    console.log(service, "service");
    console.log(loading, 'check loading')

    return (
        <div>
            <div className="container my-5 py-0 px-0">
                <div className="container border border-dark my-5 px-0 rounded" style={{height: "100%"}}>
                    <div className="container">
                        <button className="btn btn-dark mt-1 mr-1" onClick={toEditHandler}>Edit</button>
                        <button className="btn btn-danger mt-1" onClick={closeHandler}>Close</button>
                    </div>
                    <div className="container mt-3">
                        <img className="rounded mx-auto d-block border" src={avatar} alt={name} style={{width:"350px", height:"350px"}}/>
                    </div>
                    <div className="container px-3 mx-0"  style={{width: "100%", height: "100%"}}>
                        <h1 className="text-center my-5">{name}</h1>
                        <hr />
                        <div className="container">
                            <h6 className="mb-2 text-left">Address:</h6>
                            <h6 className="text-muted">{address}</h6>
                            <h6 className="mb-2 text-left">Email: </h6>
                            <h6 className="text-muted">{email}</h6>
                            <h6 className="mb-2 text-left">Phone: </h6>
                            <h6 className="text-muted">{phone_number}</h6>
                        </div>
                        <div className="container">
                            {service_type === 'venue' 
                            ? 
                            <>
                            <h6 className="mb-2 text-left">Capacity: </h6>
                            <h6 className="text-muted">{capacity}</h6>
                            </>
                            : ''
                            }
                            {service_type === 'catering' 
                            ?
                            <>
                            <h6 className="mb-2 text-left">Price: </h6>
                            <h6 className="text-muted"> Rp. {price?.toLocaleString("ID")}/porsi</h6>
                            </>
                            : 
                            <>
                            <h6 className="mb-2 text-left">Price: </h6>
                            <h6 className="text-muted"> Rp. {price?.toLocaleString("ID")}</h6>
                            </>
                            }
                            <h6 className="mb-2 text-dark text-left">Description: </h6>
                            <h6 className="mb-2 text-muted text-justify">{description}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailItem