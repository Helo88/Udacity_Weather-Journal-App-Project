/* Global Variables */
// 
// Create a new date instance dynamically with JS



let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e18ff7f1e1d24ae4969c11a2fa0da909';

const formm= document.getElementById("form")
const btn =document.getElementById("generate")
const reset =document.getElementById("reset")

const zip=  document.getElementById("zip")
const feelings=  document.getElementById("feelings")

const tempSpan =  document.getElementById("tempS")
const dateSpan =  document.getElementById("dateS")
const feelingsSpan =  document.getElementById("feelingsS")

tempSpan.textContent=""
dateSpan.textContent=""
feelingsSpan.textContent=""

zip.addEventListener('change',()=>{
  tempSpan.textContent=""
  dateSpan.textContent=""
  feelingsSpan.textContent=""
})    

formm.addEventListener('submit',async function  submitInputForm (e)
{
    e.preventDefault();

    zipCode=zip.value.trim("")
    gettemp(zipCode).then((temp)=>
     {
     
         postData('/add', { "date": newDate, "temp":temp, "feelings": feelings.value })
         
     })
     .then(()=>{ 
      updateUi()
     })

})

gettemp = async function (zipCode){

    try{
        const data = await fetch(baseUrl+zipCode+apiKey)
          const jsonData = await data.json() //promise
        if (jsonData.cod!=200) {throw new Error ("city isn't found")}
           console.log(jsonData.main.temp)
             const temp=jsonData.main.temp
             return (temp)
   
       }   catch(e){
      
           alert(e)
            console.log("error",e)
           
        }



}

 const updateUi = async function (){
  const req= await fetch('/all')
  const jsonData=await req.json()
  tempSpan.textContent=jsonData.temp
  dateSpan.textContent=newDate
  feelingsSpan.textContent=feelings.value

}

const postData = async (url = '', data = {}) => {
  console.log(url,data)
 const req= await fetch(url,
  {method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)})

    try {
     newdata = await req.json()
     console.log('response data?', data)
     return (newdata)
   }
   catch(error) {
     console.log('Error happened here!')
     console.error(error)
 
  }
  
};
  