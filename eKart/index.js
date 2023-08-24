import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

const appSettings={
    databaseURL: "https://splitit-7c68c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const itemlist = document.getElementById("item-list")

onValue(itemsInDB,function(snapshot){

    if(snapshot.exists())
    {
        let itemArray=Object.entries(snapshot.val());
        itemlist.textContent=""
        for(let i=0;i<itemArray.length;i++)
        {
            addItemToList(itemArray[i]);
        }
    }
    else{
        itemlist.innerHTML="No items yet"
    }
   
    
})


function addItemToList(item){
    let newEl=document.createElement("li");

    let itemID=item[0]; let itemVal=item[1];

    newEl.textContent=item[1]
    newEl.addEventListener("click",function(){
        let exactLocationOfItemsInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemsInDB)
    })
    itemlist.append(newEl)
}


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    if(inputValue!="")
    push(itemsInDB, inputValue)
    
    inputFieldEl.value=""
})