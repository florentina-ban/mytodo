import React from 'react';
import Item from './item.js';
import './item.css'

export default class Layout extends React.Component{
    render(){
        var idVar,textVar,statusVar;
        var list=[];
        var it1;
        for (var i=0; i<4; i++){
            var a=i+1;
            idVar='todo'+a;
            textVar='todo'+a+'text';
            if (i%2===0)
                statusVar='todo';
                else
                statusVar='in progres';
            it1= <Item id={idVar} text={textVar} status={statusVar} />;
            list.push(it1);
            }
        return(
            <div>
                <h1>aici trebie sa tiparim lista: </h1>
                <ul className="lista">
                    <h4 className="titlu">tiltlul listei</h4>
                    <br></br>

                    <li class="item_p">{list[0]}</li>
                    <li class="item">{list[1]}</li>
                    <li class="item_p">{list[2]}</li>
                    <li class="item">{list[3]}</li>
                </ul>
                    
            </div>
        );
    }

}

export class Header extends React.Component{

    render(){
        return(
            <h1>this is me</h1>
        );
    }
}
