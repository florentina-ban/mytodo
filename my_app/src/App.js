import Layout from "./Layout.js";
import React from "react";
import styled from 'styled-components';
import { generateLayoutId, getLayoutIds, getLayoutString } from "./utils.js";

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
    constructor(){
        super();
        //window.localStorage.clear();
        let layoutIds = window.localStorage.getItem('layoutIds');
        layoutIds = getLayoutIds(layoutIds);
        this.state = ({'layoutIds':layoutIds});
    }

    addOneLayout = () => {
        let {layoutIds} = this.state;
        const id = generateLayoutId(layoutIds);
        layoutIds.push(id);   
        debugger;
        console.log(getLayoutString(layoutIds));
        this.setState({layoutIds},()=>{window.localStorage.setItem('layoutIds',getLayoutString(layoutIds))});
    }

    getOneLayout = (id) => {
        return (
            <Layout id={id} addLayoutFunction={this.addOneLayout} deleteLayoutFunction={this.deleteLayout}/>
        );
    } 

    getAllLayouts = () => {
        const {layoutIds} = this.state;
        let allLayouts = [];
        layoutIds.forEach(element => {
            allLayouts.push(this.getOneLayout(element));
        });
        return allLayouts;
    }

    deleteLayout = (myId) => {
        let {layoutIds} = this.state;
        const newLayoutIds = layoutIds.filter((id) => id!==myId),
            stringLayoutsIds = getLayoutString(newLayoutIds);
        window.localStorage.removeItem('lista'+myId);
        window.localStorage.removeItem('title'+myId);
        window.localStorage.removeItem('color'+myId);
        this.setState({'layoutIds': newLayoutIds},()=>{window.localStorage.setItem('layoutIds',stringLayoutsIds)});
    }

    render(){
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
