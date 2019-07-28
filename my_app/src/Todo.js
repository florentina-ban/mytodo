import DeleteTodo from "./Delete";
import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const CheckBox = styled.input`
    cursor:pointer;
`,
    ListStyle = styled.li`
    list-style:none;
    margin:5px;
`,
    MyTodoItem = styled.span`
    padding: 3px;
    margin: 3px;
    text-align: left;
    background-color: ${(props) => (props.cheked === "nck" ? "rgb(118, 230, 44)" : "rgb(242, 203, 48)")};
    text-decoration: ${(props) => (props.cheked === "nck" ? "none" : "line-through")};
`;


export default class Todo extends React.Component {

    constructor (props) {

        super(props);
        this.state= props.ck===false ? {"className": "nck",
        "isChecked": false} : {"className": "ck",
        "isChecked": true}

    }

    static propTypes = {
        "id" : PropTypes.string,
        "text" : PropTypes.string,
        "done" : PropTypes.bool
    }

    changeClassName () {

        const cl = this.state.isChecked ? "nck" : "ck";
        this.setState({"className": cl,
            "isChecked": !this.state.isChecked},()=>{this.goOnFunction()});
    }
    goOnFunction (){
        if (this.state.isChecked & this.props.ck===false)
            this.props.setChecked(this.props.id);
        else
            if (!this.state.isChecked & this.props.ck===true)
                this.props.setChecked(this.props.id);
    }

    deleteToDo () {

        this.props.removeToDo(this.props.id);

    }

    render () {

        return (
            <ListStyle>
                <CheckBox
                    id={this.props.id}
                    onChange={this.changeClassName.bind(this)}
                    type="checkbox"
                />
                <MyTodoItem cheked={this.state.className}>
                    <strong>
                        {" "}
                        {this.props.id}
                        {" "}
                    </strong>
                    {this.props.text}
                    {" "}
                    {this.props.done.toString()}
                    {" "}

                    {" "}
                </MyTodoItem>
                <DeleteTodo
                    id={this.props.id}
                    removeToDo={this.deleteToDo.bind(this)}
                />
            </ListStyle>
        );

    }

}
