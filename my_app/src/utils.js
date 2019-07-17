function generateId(todoList){
    let a='todo';
    let found=false;
    let id;
    while (!found){
        found=true;        
        let b=Math.random()*100;
        b=parseInt(b);
        id=a+b;
        for (let i=0; i<todoList.length; i++){
            if (todoList[i].id===id){
                found=false;
            }
        }
    }
    return id;
}
export default generateId;