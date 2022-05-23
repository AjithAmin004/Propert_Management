let sBtn = document.querySelector("Button");
let mCont = document.querySelector(".main-cont");
let modCont = document.querySelector(".modal-cont");
let aFlag = true;
let aBtn = document.querySelector(".add-btn>i");
let dFlag = true;
let dBtn = document.querySelector(".del-btn>i");
let tFlag = true;
let tBtn = document.querySelector(".tog-btn>i");
let arr=[];
var uid = new ShortUniqueId();

if(localStorage.getItem("data")){
    let str = localStorage.getItem("data");
    let nArr = JSON.parse(str);
    arr = nArr;
    for(let i=0;i<arr.length;i++){
        let dataObj = arr[i];
        createData(dataObj.name,dataObj.size,dataObj.disc,dataObj.id);
    }
}


sBtn.addEventListener('click', function () {
    let name = document.querySelector('#name')
    let size = document.querySelector('#size')
    let disc = document.querySelector('#disc')
    if (name.value == "") {
        name.setAttribute('placeHolder', "Value can't be empty");
        name.style.backgroundColor = "#FDEFF4";
    } 
    if (size.value == "") {
        size.setAttribute('placeHolder', "Value can't be empty");
        size.style.backgroundColor = "#FDEFF4";
    }  
    if (disc.value == "") {
        disc.setAttribute('placeHolder', "Value can't be empty");
        disc.style.backgroundColor = "#FDEFF4";
    } 
    if(name.value!="" && size.value!="" && disc.value!="") {
        createData(name.value, size.value, disc.value);
        name.value = "";
        size.value = "";
        disc.value = "";
        name.setAttribute('placeHolder', "House");
        name.style.backgroundColor = "#E0DDAA";
        size.setAttribute('placeHolder', "25000");
        size.style.backgroundColor = "#E0DDAA";
        disc.setAttribute('placeHolder', "Available for sale");
        disc.style.backgroundColor = "#E0DDAA";

        modCont.style.display = "none";  
        aBtn.style.color = "#203239"; 
        mCont.style.display = "flex";
        aFlag = true;

    }

})

function createData(name, size, value,oldId) {
    let id;
    if(oldId==undefined){
        id=uid();
        arr.push({ "name": name, "size": size, "disc": value ,"id":id});
        updateStorage();
    }else{
        id=oldId;
    }
      //  console.log(id);    
    let data = document.createElement('div');
    data.setAttribute('class', 'data');
    data.innerHTML = `<div id="dName">${name}</div>
                     <div id="dSize">${size}</div>
                     <div id="dValue">${value}</div>`;
    mCont.appendChild(data);
  
    //handle delete
    data.addEventListener('click',function(){
        if(!dFlag){
            let dIdx = getIdx(id);
            console.log(dIdx)
            data.remove();
            arr.splice(dIdx,1);
            updateStorage()
        }
    })
    



}

aBtn.addEventListener('click',function(){
    if(aFlag){
      modCont.style.display = "block";
      aBtn.style.color = "green";
       mCont.style.display = "none";
    }else{
        modCont.style.display = "none";  
        aBtn.style.color = "#203239"; 
        mCont.style.display = "flex";
    }
    aFlag=!aFlag;
})

dBtn.addEventListener('click',function(){
   if(dFlag){
       dBtn.style.color="red";
   }else{
       dBtn.style.color = "#203239";
   }    
  dFlag=!dFlag
})

tBtn.addEventListener('click',function(){
    if(tBtn.classList.contains("fa-toggle-on")){
        tBtn.classList.remove("fa-toggle-on");
        tBtn.classList.add("fa-toggle-off")
        
    }else{
        tBtn.classList.remove("fa-toggle-off");
        tBtn.classList.add("fa-toggle-on")   
    }
    toggleArr();
})






function updateStorage(){
    let stringifyArr = JSON.stringify(arr);
    localStorage.setItem("data",stringifyArr);
}

//update storage and toggle of sort
function getIdx(id){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            return i;
        }
    }
}

function toggleArr(){
    let cont = document.querySelectorAll('.data');
    for(let i=0;i<cont.length;i++){
       cont[i].remove();
    }
    if(tFlag){
        arr.sort((a, b) => a.size - b.size);
    }else{
        arr.sort((a, b) => b.size - a.size);
    }
    for(let i=0;i<arr.length;i++){
        let dataObj = arr[i];
        createData(dataObj.name,dataObj.size,dataObj.disc,dataObj.id);
    }
    tFlag=!tFlag;

}