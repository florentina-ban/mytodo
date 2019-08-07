import DeleteTodo from "./Delete";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

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
    background-color: ${(props) => {
        if (props.cheked === "nck") {
            return "rgb(118, 230, 44)";
        }
        return "rgb(242, 203, 48)";
    }
};
    text-decoration: ${(props) => {
        if (props.cheked === "nck") {
            return "none";
        }
        return "line-through";
    }
};
`;

export default class Todo extends React.Component {

    static propTypes = {
        "ck": PropTypes.bool,
        "done": PropTypes.bool,
        "id": PropTypes.string,
        "removeToDo": PropTypes.func,
        "setChecked": PropTypes.func,
        "text": PropTypes.string
    }

    static defaultProps = {
        "ck": true,
        "done": true,
        "id": "",
        "removeToDo": () => null,
        "setChecked": () => null,
        "text": ""
    }

    constructor (props) {

        super(props);
        if (props.ck === false) {
            this.state = {"className": "nck",
                "isChecked": false,
                "htmlTag": "span"};
        } else {
            this.state = {"className": "ck",
                "isChecked": true,
                "htmlTag": "span"};
        }
        this.handleChangeClassName = this.handleChangeClassName.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);

    }

    handleChangeClassName () {
        const {isChecked} = this.state;
        let cl = "";
        if (isChecked) {
            cl = "nck";
        } else {
            cl = "ck";
        }
        this.setState({"className": cl,
            "isChecked": !isChecked}, () => {
            this.goOnFunction();
        });
    }

    goOnFunction () {
        const {isChecked} = this.state,
            {ck, id, setChecked} = this.props;
        if (isChecked && ck === false) {
            setChecked(id);
        } else
        if (!isChecked && ck === true) {
            setChecked(id);
        }
    }

    deleteToDo () {
        const {id} = this.props,
            {removeToDo} = this.props;
        removeToDo(id);

    }

    handleOnClick () {
        this.setState({"htmlTag":"input"});
    }

    render () {
        const {done, id, text} = this.props,
            {className, htmlTag} = this.state;
        return (
            <ListStyle>
                <CheckBox
                    id={id}
                    onChange={this.handleChangeClassName}
                    type="checkbox"
                />
                <MyTodoItem cheked={className}>
                    <strong>
                        {" "}
                        {id}
                        {" "}
                    </strong>
                    
                    {text}
                    {" "}
                    
                    {done.toString()}
                    {" "}

                    {" "}
                </MyTodoItem>
                <DeleteTodo
                    id={id}
                    removeToDo={this.deleteToDo}
                />
            </ListStyle>
        );

    }

}
