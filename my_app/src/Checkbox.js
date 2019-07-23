import React from "react"
import styled from "styled-components"
const CheckStyle=styled.input`
    cursor:pointer;
`

export default class Checkbox extends React.Component{
    constructor(props){
        super(props);
        const a=this.props.ref_la_item.current;
        this.ref_la_item_c=a;
        this.state={isChecked:false}
        this.action=this.action.bind(this);
    }

    action () {
        this.setState({isChecked: !this.state.isChecked},  () => {});
        this.ref_la_item_c.action();
        
    }
    render(){
        return(
            <CheckStyle> type="checkbox" id={this.props.id} value={this.state.isChecked} onChange={this.action}</CheckStyle>
        );
    }

}