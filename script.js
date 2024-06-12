let btn=document.getElementById('started');
let userip;
document.getElementById('section2').style.display='none';
document.addEventListener('DOMContentLoaded',()=>{
fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    console.log('Your IP address is:', data.ip);  
    document.querySelector('#div>p').innerHTML=`
    Your Current IP Address is <b>${data.ip}</b>`;
    userip=data.ip;
  }).catch(error => {
    console.error('Error fetching IP address:', error);
  });
});
////////////////////////////////////////////////////
btn.addEventListener('click',()=>{
    start();
});
/////////////////////////////////////////////
async function start(){
try{
    /// promise main1 https://ipapi.co/${IP}/json/
 const res1=await  fetch(`https://ipapi.co/${userip}/json`)
        console.log(res1);
        //return promise 
    const data=await res1.json();
        document.getElementById('section1').style.display="none";
        document.getElementById('section2').style.display='block';
        const datetime = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });

        document.getElementById('section2').innerHTML=`
        <div id='div1'><p id='section2title1'>IP Address : <b>${userip}</b></p>
        <div><p>Lat: <span>${data.latitude}</span> </p>
             <p>Long: <span>${data.longitude} </p></div>

              <div><p>City: <span>${data.city}</span></p>
             <p>Region: <span>${data.region}</span></p></div>

              <div><p>Organisation: <span>${data.org}</span></p>
             <p>Hostname: <span>${window.location.hostname}</span> </p></div>
        </div>
        <div id='div2'>
        <p id='section2title2'>Your Current Location</p>
       <iframe src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&output=embed" frameborder="0">
       </iframe></div>
       <div id='div3'>
       <p id='section2title3'>More Information About You</p>
       <p>Time Zone: <span>${data.timezone}</span></p>
       <p id='section2date'>Date And Time: <span>${datetime}</span></p>
       <p>Pincode: <span>${data.postal}</span></p>
       <p id='section2message'>Message: <span>Number of pincode(s) found: </span></p>
       </div>
       `;
       setInterval(()=>{
        const datetime = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
        document.getElementById('section2date').innerHTML=`Date And Time: ${datetime}`;
        },1000);
        console.log(data);
 // promise main2 https://api.postalpincode.in/pincode/${pincode}       
const res2=await fetch(`https://api.postalpincode.in/pincode/${data.postal}`);
// return promise
const data2=await res2.json();
document.getElementById('section2message').innerHTML=`Message: <span>${data2[0].Message}</span>`;
document.getElementById('section2').innerHTML+=`
<div id='div4'>
<p id='section2title4'>Post Offices Near You</p>
<input id='section2search' type='search' placeholder='Search By Name'>
<div id='section2postoffices'></div>
</div>`;

data2[0].PostOffice.forEach(elem=> {
    document.getElementById('section2postoffices').innerHTML+=`
    <div>
   <p> Name <span>${elem.Name}</span></p>
   <p> Branch Type <span>${elem.BranchType}</span></p>
   <p> Delivery Status <span>${elem.DeliveryStatus}</span></p>
   <p> District <span>${elem.District}</span></p>
   <p> Division <span>${elem.Division}</span></p>
   </div>
   `;
});
console.log(data2);
//////
const search=document.getElementById('section2search');
search.addEventListener('input',()=>{
    const searchVal=search.value.toLowerCase().trim();
    if (searchVal!=""){
        document.getElementById('section2postoffices').innerHTML="";
        data2[0].PostOffice.forEach((elem)=>{
            if(elem.Name.toLowerCase().includes(searchVal) || elem.BranchType.toLowerCase().includes(searchVal) || elem.DeliveryStatus.toLowerCase().includes(searchVal) || elem.Division.toLowerCase().includes(searchVal)) {
            document.getElementById('section2postoffices').innerHTML+=`
            <div>
       <p> Name <span>${elem.Name}</span></p>
       <p> Branch Type <span>${elem.BranchType}</span></p>
       <p> Delivery Status <span>${elem.DeliveryStatus}</span></p>
       <p> District <span>${elem.District}</span></p>
       <p> Division <span>${elem.Division}</span></p>
       </div>`;
            }
        }); 
    }else{
        document.getElementById('section2postoffices').innerHTML="";
        data2[0].PostOffice.forEach(elem=> {
            document.getElementById('section2postoffices').innerHTML+=`
            <div>
           <p> Name <span>${elem.Name}</span></p>
           <p> Branch Type <span>${elem.BranchType}</span></p>
           <p> Delivery Status <span>${elem.DeliveryStatus}</span></p>
           <p> District <span>${elem.District}</span></p>
           <p> Division <span>${elem.Division}</span></p>
           </div>
           `;
        }); 
    }
    
});
}catch(e){
    console.error(e);
}
}
   