import React,{useState} from "react";
import {useHistory } from "react-router-dom";
const axios = require('axios').default;

function List(){

    let history = useHistory();
    const [total,setTotal]=useState();
    const [totalCin,setTotalCin]=useState([]);
    const [totalName,setTotalName]=useState([]);
    

    React.useEffect(()=>{
        axios.get("http://localhost:3001/data")
            .then(function (response) {
                setTotal(response.data.length)
                let a=[],b=[];
                for(let x=0;x<response.data.length;x++){
                        a.push(
                            <p className="font2">{response.data[x].cin}</p>
                        )
                        b.push(
                            <p className="font2">{response.data[x].name}</p>
                        )
                }
                setTotalCin(a)
                setTotalName(b)
            //   console.log(response)
               
            })
            .catch(function (error) {
            //   console.log(error);
            })
            .finally(function () {
    
    
            });
    },[])

    return(
        <div className="row justify-content-md-center">
   
            <div className="col-sm-8 column" style={{padding:"0 5%"}}>
                <button className="btn btn-primary" style={{marginLeft:0}} onClick={()=>{history.push("/")}}>COMPANY +</button>
                <div className="row section1">
                    <div className="col-lg-5 col-sm-5 column">
                        <p className="font1">CIN</p>
                    </div>
                    <div className="col-lg-7 col-sm-7 column">
                        <p className="font1">Name</p>
                    </div>
       
                </div>
                <hr/>
                <div className="row ">
                    <div className="col-lg-5 col-sm-5 column">
                        {totalCin}
                    </div>
                    <div className="col-lg-7 col-sm-7 column">
                       {totalName}
                    </div>
       
                </div>
                <p className="font1 last">{"showing 1 to "+total+" of "+total+" enteries"}</p>
       
            </div>
       
        </div>
    )
}

export default List;