export let postCassette = async (data)=>{

    try {
        let response = await fetch("http://localhost:3000/v1/cassette", {
          method: "POST",
          headers: { "Content-Type": "application/json" , 
                       "user-token":  sessionStorage.getItem('user-token')
        } ,
          body: JSON.stringify(data),
        });
      
          return true;
  
      
     
      } catch (error) {
     
        return false;
      }

}


export let GetallCassetesFromUser = async ()=>{

}
 