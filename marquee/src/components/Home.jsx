import React,{useState} from "react";
import { useHistory } from "react-router-dom";
const axios = require('axios').default;
const qs = require('qs')


function Home(){
    const [suggest,setSuggest]=React.useState([]);
    const [suggestBox,setSuggestBox]=React.useState("none");
    const [suggestFlag,setSuggestFlag]=React.useState(false);
    let history = useHistory();
    const [cin, setCin] = useState("");
    const [search, setSearch] = useState({
      });
      function handleChange(event) {
        const { name, value } = event.target;
        suggestion(value)
        setSearch(prevSearch => {
          return {
            ...prevSearch,
            [name]: value
          };
        });
        //console.log(search.search1);
      }


      function suggestion(title){
        setSuggest([])
        if(suggestFlag){

        
        setSuggestBox("none")
        if(title.length>0){
            const headers = {
                'authority': 'www.zaubacorp.com',
                'method': 'POST',
                'path':'/custom-search',
                'Access-Control-Allow-Origin':'https://www.zaubacorp.com https://can.zaubacorp.com https://zaubacorp.com https://localhost:3000/'

              }
     
        
      axios.post("https://www.zaubacorp.com/custom-search", {
          search: title,
          filter:"company"
  
        },{header:headers})
          .then(function (response) {
              let temp=[]
              setSuggestFlag(false)
              let v=response.data.split("</div>")
              // console.log(v.length)
              for(let x=0;x<v.length-1;x++){
                  setSuggestBox("")
                  if(x!==v.length-2){
                    temp.push(
                      <span>
                      <p className="search-content mb-1" 
                      onClick={()=>{setSearch({search1:v[x].substring(v[x].indexOf(">")+1)});setCin(v[x].substring(v[x].lastIndexOf("/")+1,v[x].indexOf(">")-1))}}        
                       style={{cursor:"pointer",color:"#000 !important",padding:"5px 5px"}} value={v[x].substring(v[x].indexOf(">")+1)}>{v[x].substring(v[x].indexOf(">")+1)}</p>
                    <hr style={{borderTop:"0.1px solid #3E95CD",borderBottom:"0",padding:"0",margin:"0 10% 0 2%"}}/>
                    </span>
                    );
                  }
                  else{
                    temp.push(
                      <p className="search-content mb-1" onClick={()=>{setSearch({search1:v[x].substring(v[x].indexOf(">")+1)});setCin(v[x].substring(v[x].lastIndexOf("/")+1,v[x].indexOf(">")-1))}}        
                      style={{cursor:"pointer",color:"#000 !important",padding:"5px 5px"}} value={v[x].substring(v[x].indexOf(">")+1)}>{v[x].substring(v[x].indexOf(">")+1)}</p>
                      );
                  }
                  
              }
              setSuggest(temp)
            // console.log(response.data)
             
          })
          .catch(function (error) {
            // console.log(error);
          })
          .finally(function () {
  
  
          });
      }
      else{
        setSuggestBox("none")
      }
    }
      
    }

    function add(a,b){
      // console.log(a,b)
      
      const payload=qs.stringify({
        cin:a,
        name:b
      })
      axios.post("http://localhost:3001/data",payload)
            .then(function (response) {
               history.push("/list")
              //  console.log(response)
            })
            .catch(function (error) {
              // console.log(error);
            })
            .finally(function () {
    
    
            });
    }

    return(
    <div className="row justify-content-md-center">
   
    <div className="col-sm-6 column">
    <input  type="text" id="site-search" className="form-control mr-sm-2 header_search_box" name="search1" aria-label="Search through site content" placeholder="search"  style={{ border: "1px solid #ccc", borderRadius: "5px" }} onChange={handleChange}  value={search.search1} autoComplete="off"  onKeyDown={()=>{setSuggestFlag(true)}} onBlur={()=>{setTimeout(function(){ setSuggestBox("none") }, 500);}} onFocus={()=>{if(suggest.length>=1)setSuggestBox("")}} />
                <div className="search-sugg1" style={{display:suggestBox}}>
                   {suggest}
                  </div>
                  <br/>
    <button className="btn btn-primary" onClick={()=>{add(cin,search.search1)}}>SUBMIT</button>
    </div>
   
  </div>
    );
}

export default Home;