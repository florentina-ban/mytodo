import {generateLayoutId, getLayoutIds, getLayoutString} from './utils.js';
import Layout from './Layout.js';
import React from 'react';
import styled from 'styled-components';

const AllLayouts = styled.form`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`,
    ListTitle = styled.h1`
    background-color: #f1f3f4;
    margin: auto;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 0;
    color: #5f6368;
`;

class App extends React.Component {
    constructor () {
        super();
        // Window.localStorage.clear();
        let layoutIds = window.localStorage.getItem('layoutIds');
        layoutIds = getLayoutIds(layoutIds);
        this.state = {layoutIds};
    }

    addOneLayout = () => {
        const {layoutIds} = this.state,
            id = generateLayoutId(layoutIds),
            store = window.localStorage;
        layoutIds.push(id);
        this.setState({layoutIds}, () => {
            store.setItem('layoutIds', getLayoutString(layoutIds));
        });
    }

    getOneLayout = (id) => <Layout
        addLayoutFunction={this.addOneLayout}
        deleteLayoutFunction={this.deleteLayout}
        id={id}
    />


    getAllLayouts = () => {
        const {layoutIds} = this.state,
            allLayouts = [];
        layoutIds.forEach((element) => {
            allLayouts.push(this.getOneLayout(element));
        });
        return allLayouts;
    }

    deleteLayout = (myId) => {
        const {layoutIds} = this.state,
            newLayoutIds = layoutIds.filter((id) => id !== myId),
            stringLayoutsIds = getLayoutString(newLayoutIds);
        window.localStorage.removeItem(`lista${myId}`);
        window.localStorage.removeItem(`title${myId}`);
        window.localStorage.removeItem(`color${myId}`);
        this.setState({'layoutIds': newLayoutIds}, () => {
            window.localStorage.setItem('layoutIds', stringLayoutsIds);
            document.location.reload(true);
        });
    }

    render () {
        return (
            <div>
                <ListTitle>
                    {'My ToDo lists'}
                </ListTitle>
                <AllLayouts>
                    {this.getAllLayouts()}
                </AllLayouts>
            </div>
        );
    }
}

export default App;
