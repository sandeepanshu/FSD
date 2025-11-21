import React, {useState} from 'react';

interface IProps {
    pText : string;
    sendData: (value: string) => void
}
interface IState {
    cText: string;
}

let ChildCard:React.FC<IProps> = ({pText , sendData}) => {
    let [childState , setChildState] = useState<IState>({
        cText : ''
    });

    let updateInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setChildState({
            cText : event.target.value
        });
        sendData(event.target.value);
    };

    return (
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body rgba-red-light text-white">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form>
                                                <div className="form-group">
                                                    <input
                                                        value={childState.cText}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Child Text"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <small className="text-dark font-weight-bold">{pText}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ChildCard;
