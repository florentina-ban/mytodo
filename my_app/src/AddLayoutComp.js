import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const AllLayout = styled.h1`
    border: 4px #f1f3f4 solid
    color: #5f6368;
    width: 30%;
    margin: auto
    font-size: 15px;
    margin-bottom: 17px;
    cursor: pointer;
    padding: 15px;
    border-radius: 25px;
`,
    MyInput = styled.input`
    border : 0;
    outline: none;
    ::-webkit-input-placeholder {
        color: #590303;
        font-size: 15px;
`;
export default class AddLayoutComp extends React.Component {
    static propTypes = {
        'addLayoutFunction': PropTypes.func
    }

    static defaultProps = {
        'addLayoutFunction': () => null
    }

    constructor (props) {
        super(props);
        this.state = {'clicked': false};
        this.inputRef = React.createRef();
    }

    handleClick = () => {
        const {clicked} = this.state;
        this.setState({'clicked': !clicked});
    }

    handleEnter = (event) => {
        const {addLayoutFunction} = this.props,
            text = this.inputRef.current.value.trim();
        if (event.key === 'Enter' && text.length) {
            addLayoutFunction(text);
            this.inputRef.current.value = '';
        }
    }

    getHtmlComp = () => {
        const {clicked} = this.state,
            htmlTag = clicked
                ? <MyInput
                    id="one"
                    onBlur={this.handleClick}
                    onKeyPress={this.handleEnter}
                    onMouseOver={() => {
                        this.focusFunction();
                    }}
                    placeholder="Add a new note.."
                    ref={this.inputRef}
                    type="text" />
                : <span onClick={this.handleClick}>
                    {'Add a new note...'}
                </span>;
        return htmlTag;
    }

    focusFunction = () => {
        document.getElementById('one').focus();
    }

    render () {
        return (
            <AllLayout>
                {this.getHtmlComp()}
            </AllLayout>
        );
    }

}
