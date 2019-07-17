import React from 'react';
import "./all.css";

export default class AddComponent extends React.Component{
    render(){
        return(
            <div className="add_flex">
                <div>
                    <div className="child">
                            <label className="child_l" >id: </label>
                            <input  className="child_i" type='text' id="id_id"></input>
                    </div>

                    <div className="child">
                        <label className="child_l">to do: </label>
                        <input  className="child_i" type='text' id="todo_id"></input>
                    </div>

                    <div className="child">
                        <label className="child_l">is it done? (y/n): </label>
                        <input className="child_i" type='text' id="done_id" ></input>
                    </div>
                    
                    <input className="child" type="button" id="add_button_id" value="Add todo item" onClick={this.props.addToDo.bind(this)}></input>
                </div>
            </div>
        );
    }
}