const base= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdownselect = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const message=document.querySelector(".msg");

for(let select of dropdownselect){
    for (curcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=curcode;
        newoption.value=curcode;   
        if(select.name === "from" && curcode === "USD"){
            newoption.selected= "selected";
        } else if(select.name === "to" && curcode === "INR"){
            newoption.selected= "selected";
        }
        select.append(newoption);
    }  
    
    select.addEventListener("change",(evnt)=>{
        updateflag(evnt.target);
    })
}

const updateflag=(element)=>{
    let curcode=element.value;
    let countrycode= countryList[curcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let i=element.parentElement.querySelector("img");
    i.src=newsrc;
}

let updateexchange= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;   
    if(amtvalue==="" || amtvalue<1){
        amtvalue=1;
        amount.value="1";
    }

    const base_url=`${base}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(base_url);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    
    let finalamount=amtvalue*rate;
    message.innerHTML=`${amtvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value} `;

}

window.addEventListener("load",()=>{
    updateexchange();
})


btn.addEventListener("click",(evnt)=>{
    evnt.preventDefault();
    updateexchange();
        
})
