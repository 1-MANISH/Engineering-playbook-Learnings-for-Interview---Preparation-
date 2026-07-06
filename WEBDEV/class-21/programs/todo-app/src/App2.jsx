
import axios from "axios"
import { useEffect, useState } from "react";



function App() {

        console.log("Component rendered...")

        const [todos,setTodos] = useState<{title:string,id:number,userId:number,completed:boolean}[]>([])


      


        // let [ timeoutID,setTimeoutID] = useState<NodeJS.Timeout | null>(null);

        // axios.get("https://jsonplaceholder.typicode.com/todos").then(response=>{
        //         setData(response.data)
        // })

        // function addData(){
        //         let timeoutID = setTimeout(()=>{
        //         setData(p=>[...p,{
        //                         title:"hello",
        //                         id:Math.floor(Math.random()*100)
        //                 }])
        //         },1000)

        //         setTimeoutID(timeoutID)

        // }

        // function cancelData(){
        //         if(timeoutID){
        //                 clearTimeout(timeoutID)
        //                 setTimeoutID(null)
        //         }
        // }

        useEffect(()=>{
                  axios.get("https://jsonplaceholder.typicode.com/todos").then(response=>{
                        setTodos( response.data)
                })
                return ()=>{
                    
                }
        },[])

        return (
        <>
                <h1>HELLO</h1>
                
                        <div>
                               {
                                todos.map((item,index)=>{
                                        return <Todo key={index} title={item.title} id={item.id}/>
                                })
                               }
                        </div>


                        <ChildComponent />
                
        </>
        )
}

function ChildComponent(){

        console.log("Child Component rendered...")

        useEffect(()=>{
                console.log("Child use Effect")
        },[])
        return <h1>Child Component</h1>
}

function Todo({title,id}: {title:string,id:number}) {

        return <div style={{border:"2px dashed green",background:"lightgreen" ,padding:"12px",margin:"4px"}}>
                        <h4>{id}</h4>
                        <p>{title}</p>
                </div>
}

export default App
