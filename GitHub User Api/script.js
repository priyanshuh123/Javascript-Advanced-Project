
const container = document.querySelector(".container")
const btn = document.querySelector("#btn")

const getUserdata = async (username) =>{

try{

             const response = await fetch(`https://api.github.com/users/${username}`)

          const data = await response.json();
          console.log(data)


            
                   const cardDiv = document.createElement('div')
                       cardDiv.classList.add('card')

               cardDiv.innerHTML = `


                             <div class="flex-col justify-center items-center">
                                         
                              <img src = "${data.avatar_url}" class="w-72 rounded-full flex justify-center items-center">
                              <h1>${data.name}</h1>

                              <div class="flex justify-center gap-6">


                              <h1>${data.followers} followers</h1>
                              <h1>${data.following} following</h1>
                              
                              </div>
                              </div>


                              

               
               `

               container.appendChild(cardDiv)


}catch(error){
           
           console.log(error)
}   

}

getUserdata("priyanshuh123");