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
        history.push('/')
    }

    const toEditHandler = function () {
        history.push(`/edit/${service_type}/${id}`)
    }

    console.log(service, "service");
    console.log(loading, 'check loading')

    return (
        <div>
            {/* <!-- component --> */}
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                        src={avatar} 
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{service_type}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                        <p className="leading-relaxed text-gray-900 text-justify">{description}</p>
                        
                        <div className="flex justify-start mt-6 items-center mb-1">
                            <div className="flex-row justify-start">
                                <span className="mr-0"><i class="fas fa-phone"></i></span>
                                <span className="text-gray-900 text-justify">{phone_number}</span>
                            </div>
                            <div className="flex-row justify-start">
                                <span className="mr-0"><i class="fas fa-envelope"></i></span>
                                <span className="text-gray-900 text-justify">{email}</span>
                            </div>
                        </div>
                        <div className="flex-row justify-center border-b-2 border-gray-200 pb-3 mb-3">
                            <span><i class="fas fa-map-marker-alt"></i></span>
                            <span className="text-gray-900 text-justify">{address}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="title-font font-medium text-2xl text-gray-900">{service_type === 'catering' ? "Rp." + price?.toLocaleString("ID") + "/porsi" : "Rp." + price?.toLocaleString("ID")}</span>
                            <div className="flex-row">
                                <button onClick={toEditHandler} className="mr-1 bg-transparent text-blue-700 font-semibold hover:text-gray-900 hover:bg-blue-800 py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                                    Edit
                                </button>
                                <button onClick={closeHandler} className="text-white bg-red-500 border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailItem