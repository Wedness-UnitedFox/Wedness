import React from 'react'
import { useParams } from 'react-router-dom'

const ChatRoom = () => {
    let { id } = useParams()
    
    return (
        <div style={{marginTop: "0", width: "800px", height: "100%"}}>
            <h1 style={{textAlign: "center"}}> Chat {id} Room</h1>
            <hr />
            <div className="container d-flex flex-column">
                <div className="overflow-auto" style={{height: "300px"}}>
                    <div className="row border">
                        <div class="col-6 align-items-end">
                            <div className="card p-3">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                    </small>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card p-3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <footer className="blockquote-footer">
                                <small className="text-muted">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                                </small>
                            </footer>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card p-3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <footer className="blockquote-footer">
                                <small className="text-muted">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                                </small>
                            </footer>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card p-3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <footer className="blockquote-footer">
                                <small className="text-muted">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                                </small>
                            </footer>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <form className="form-inline">
                        <div className="form-group mx-sm-2 mb-2" style={{width: "88%"}}>
                            <input type="text" className="form-control" id="inputPassword2" placeholder="Type here..." style={{width:"100%"}}/>
                        </div>
                        <button type="submit" className="btn btn-primary mx-sm-1 mb-2">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom
