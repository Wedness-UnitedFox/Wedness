import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {

    const history = useHistory()

    const handleDetail = (e) => {
        e.preventDefault()
        history.push('/vendor/venue/:id')
    }
    
    return (
        <div>
            <div className="jumbotron justify-content-center mt-3">
                <div className='row justify-content-center'>
                    <div className="card shadow col-3 m-3 align-items-center justify-content-center">
                        <div className="card-body text-center">
                            <img className="card-img-top" src="..." alt="..." />
                            <div className="card-title mt-3">
                                <div className="card-text mt-3">Testing</div>
                                <button className="btn btn-info" onClick={(e) => {handleDetail(e)}}>Detail</button>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow col-3 m-3 align-items-center justify-content-center">
                        <div className="card-body text-center">
                            <img className="card-img-top" src="..." alt="..." />
                            <div className="card-title mt-3">
                                <div className="card-text mt-3">Testing</div>
                                <button className="btn btn-info">Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home