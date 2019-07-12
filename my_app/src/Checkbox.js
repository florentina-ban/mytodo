import React, {Component} from "React";

export default class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state={isChecked:false}
        this.action=this.action.bind(this);
    }
    action () {
        this.setState({isChecked:true},  () => {});
    }
    render(){
        return(
                <input type="checkbox" id={this.id} value={this.state.isChecked} onChange={this.action}></input>
        );
    }

}
