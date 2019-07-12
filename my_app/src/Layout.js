import React, {Component} from 'react';
import Item from './Item.js';
import Checkbox from './Item.js'

export default class Layout extends Component{
    render(){
        var idVar,textVar,statusVar;
        var list=[];
        var it1;
        for (var i=0; i<4; i++){
            var a=i+1;
            idVar='todo'+a;
            textVar='todo'+a+'text';
            if (i%2===0){
                statusVar='todo';
            }
                else{
                statusVar='in progres';
            }
        it1= <Item id={idVar} text={textVar} status={statusVar} />;
            list.push(it1);
            }
        return(
            <div>
                <h1>aici trebie sa tiparim lista: </h1>
                <ul className="lista">
                    <h4 className="titlu">tiltlul listei</h4>
                    <br></br>
                    {list}
                </ul>
                    
            </div>
        );
    }

}