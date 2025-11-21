import React, {useState} from 'react';

interface IProps {
    message : string,
    sendData : (value:string) => void
}
interface IState {
    cMessage : string;
}

let ChildComponent:React.FC<IProps> = ({message , sendData}) => {
    let [childState , setChildState] = useState<IState>({
        cMessage : 'Hello from Child'
    });

    let clickButton = () => {
        sendData(childState.cMessage);
    };

    return (
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body bg-warning text-white">
                                    <p className="h3">Child Component</p>
                                    <small>{message}</small><br/>
                                    <small>{childState.cMessage}</small><br/>
                                    <button className="btn btn-light btn-sm" onClick={clickButton}>send to Parent</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ChildComponent;
