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

    useEffect(() => {
        if (!localStorage.access_token) history.push('/login')
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
        // <div>
        //     <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64" style={{ height: "300px" }}>
        //         <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={avatar} alt="..." />
        //         <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
        //             <div class="flex items-center">
        //                 <h2 class="text-xl text-gray-800 font-medium mr-auto">{name}</h2>
        //                 <p class="text-gray-800 font-semibold tracking-tighter">
        //     <div className="container">
        //                         <h6 className="mb-2 text-left">Address:</h6>
        //                         <h6 className="text-muted"></h6>
        //                         <h6 className="mb-2 text-left">Email: </h6>
        //                         <h6 className="text-muted"></h6>
        //                         <h6 className="mb-2 text-left">Phone: </h6>
        //                         <h6 className="text-muted">{phone_number}</h6>
        //                     </div>
        //                 </p>
        //                 <p class="text-sm text-gray-700 mt-4">{address}</p>
        //                 <p class="text-sm text-gray-700 mt-4">{address}</p>
        //             </div>
        //             <div class="flex items-center justify-end mt-4 top-auto">
        //                 <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Delete</button>
        //                 <button class=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2">Edit</button>
        //                 <button class=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Publish</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default DetailItem