import React from 'react';
import "./all.css";

export default class AddComponent extends React.Component{
    render(){
        return(
            <div className="add_comp">
                <br></br>
                <div>
                <label>id: </label>
                <input type='text' id="id_id"></input>
                </div>

                <div>
                <label>to do: </label>
                <input type='text' id="todo_id"></input>
                </div>

                <div>
                <label>is it done? (y/n): </label>
                <input type='text' id="done_id"></input>
                </div>

                <input type="button" id="add_button_id" value="Add todo item" onClick={this.props.add_f.bind(this)}></input>
            </div>
        );
    }
}