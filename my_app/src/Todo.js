import React from "react";
import "./all.css"
import { throwStatement, thisExpression } from "@babel/types";


export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.li_ref=null;
        this.ck_ref=null;
        this.auto_ref=React.createRef();
        this.state={className:"nck" };
     };
     action = () => {
            if (this.ck_ref.current.props.isChecked===true)
                this.setState({className:"ck"},()=>{});
            else
                this.setState({className:"nck"},()=>{});
     };
    render(){
        return(
            <li className={this.state.className} ref={(li)=>{this.li_ref=li}}> 
                <Checkbox id={this.props.id+'c'} ref_la_item={this.auto_ref} ref={(Checkbox)=>{this.ck_ref=Checkbox}} />                   
                <strong>{this.props.id}  &nbsp; </strong> {this.props.text} {this.props.done.toString()} 
              </li>
            );
    };
}
export class Checkbox extends React.Component{
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
            <div>
                <input type="checkbox" id={this.props.id} value={this.state.isChecked} onChange={this.action}/>     
                </div>
        );
    }

}