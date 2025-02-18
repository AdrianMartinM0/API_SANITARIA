export let postCassette = async (data)=>{

    try {
        let response = await fetch("http://localhost:3000/v1/cassette", {
          method: "POST",
          headers: { "Content-Type": "application/json" , 
                       "user-token":  sessionStorage.getItem('user-token')
        } ,
          body: JSON.stringify(data),
        });
      
          return response;
  
      
     
      } catch (error) {
     
        return false;
      }

}


export let GetallCassetesFromUser = async ()=>{


try {
    let cassetes = await fetch("http://localhost:3000/v1/cassette", {
      method: "GET",
      headers: { "Content-Type": "application/json" , 
                   "user-token":  sessionStorage.getItem('user-token')
    }    });
  
      return cassetes.json();

  
 
  } catch (error) {
 
    return false;
  }

}
 

export let GetOneCassetteById = async (id)=>{
    try {
        let cassetes = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" , 
                       "user-token":  sessionStorage.getItem('user-token')
        }    });
      
          return cassetes.json();
    
      
     
      } catch (error) {
     
        return false;
      }
}


export let DeleteCasseteById = async (id)=>{
  //  http://localhost:3000/v1/cassette/1 

    try {
        let response = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" , 
                       "user-token":  sessionStorage.getItem('user-token')
        }    });
      
          if (response.ok) {
            return true;
          }else{
            return false;
          }
    
      
     
      } catch (error) {
     
        return false;
      }
}




export let EditCasseteById = async (id , data)=>{
    //  http://localhost:3000/v1/cassette/1 
  
      try {
          let response = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" , 
                         "user-token":  sessionStorage.getItem('user-token')
          },
          body: JSON.stringify(data),
        });
        
            if (response.ok) {
              return true;
            }else{
              return false;
            }
      
        
       
        } catch (error) {
       
          return false;
        }
  }