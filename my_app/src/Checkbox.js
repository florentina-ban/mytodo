import React, {Component} from "React";

export default class Checkbox extends Component{
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