import React from 'react';

interface IProps {}

interface IState {}

class StockDetails extends React.Component<IProps, IState>{

    constructor(props:IProps) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <h1>StockDetails component</h1>
            </React.Fragment>
        );
    }
}
export default StockDetails;
