import Delete from "./Delete";
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
        this.state = {"className": "nck",
            "isChecked": false};

    }

    static propTypes = {
        "id" : PropTypes.string,
        "text" : PropTypes.string,
        "done" : PropTypes.bool
    }

    changeClassName () {

        const cl = this.state.isChecked ? "nck" : "ck";
        this.setState({"className": cl,
            "isChecked": !this.state.isChecked});

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
                <Delete
                    id={this.props.id}
                    removeToDo={this.deleteToDo.bind(this)}
                />
            </ListStyle>
        );

    }

}
