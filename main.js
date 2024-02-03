// call all element from the DOM
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// check that all element is okay 
// console.log(title, price, taxes, ads, discount, count , category, submit);


// get total
// I get the price and calculate taxes, ads, and discount if it is exist and in the final get the total
function getTotal(){
    // this function will work if i type any number in any field price, taxes, ads and discount in onckeyup
    // console.log('Done'); to check if the field is work
    // I want get the price value and added it with taxes and ads and substract the discount from the value
    if(price.value != ''){
        // I want to check if the price have a value
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        // I want to put the result in the total 
        total.innerHTML = result;
        // we have a problem is the result is a string like 11 11 11 is 111111 and i want 33 so i just add (+ price.value) is make this string as a number and do that to all 
        // I have another problem that if i have a number the total is green color else if i don't have the total is red so i write:...
        total.style.background = '#040';
        // green color #040      red color #a00d02
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }

}



// create product
// i want when i click at the create button i make a new product 
// note when i work with a data the first thing to think is where this data will save so i want to get all the previous values and save it in specife place 
// easy way to save data is the array because i can add, remove, modified, loop in it and more...
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
    // use parse to bakc the stringify to the origin
}else{
    // when we don't have any data just we have an empty array
    let dataPro = [];
    localStorage.setItem('product',  JSON.stringify(dataPro)  );
    // I am here fix problem by mysilf i just add virtual value to add when the array is empty and store it in localstorage
    //  // // // // this problem to fix it just refrecht the site 
}

// let dataPro = [];


// i want when i click on the create button all value data stored in teh array dataPro
submit.onclick = function(){
    // wamt to store all the single product data in object have all the product attribute
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        // innerHTML because this is not input this is small
        count : count.value,
        category : category.value.toLowerCase(),
        // toLowerCase() fix the casesensentive problem when i add data in uppercase or lowercase convert it to lowercase
    }
        // console.log(newPro); to preview the object i added in the console
    // i want to add the new product object to the nend of the array


    // from count process
    // check if the newPro has data or not 
    // add new if else for don't make new product if the mood is not create

    // to vaidate the data and then create data like that if the title is not empty field & the price the same thing
    // and i want to don't delete the data else i creat new product so i add clearData() in the end out of the condition
    // i want to control of the count number to enter in my system for instance not more than 100 product
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){
        if(mood === 'create'){
            if(newPro.count > 1){
                // I want to make loops repeat as a time of count   
                for(let i=0 ; i<newPro.count ; i++){
                    dataPro.push(newPro);
                    // now this will add as many time of count 
                }
            }else{
                dataPro.push(newPro);
                // if the count is 0 or negative number
            }
        }else{
            // i don't want to do push i want to modified the coming index and change the data in it  
            dataPro[ tmp ] = newPro;
            // but the index i  is not here it is in update how can i get it to here?
            // this is the most important things in this paragraph we can use the anonymous varible or helper varibel  
            // i make new variable his name is tmp in the first of the programm in line 12  and this variable don't have any  data this variable is (GLOBAL) all function can see it 
            // if i click the updateData button take the index and add it to tmp = i; now i is seen in all functions in Line 279 in take this tmp to indes of array Line 95
            // now after i change and modified all data back the mood to creat
            mood = 'create';
            // to change the button to creat 
            submit.innerHTML = 'Create';
            // i want to preview the count box again
            count.style.display = 'block';
            console.log(mood);
    
        }
        clearData();
    }
    
    



    // now when i add new projcet the array will add new object but when i refresh the page all data will disappear so we go to localstorage
    // the array is the place all my data in it so i want to use it in localstorage 
    
   // save localsotrage
    localStorage.setItem('product',  JSON.stringify(dataPro)  );

    // we write a JSON.stringyfy(dataPro) instead of dataPro because the loclastorage just treat with string 
    // but we have a problem when i add new product all old product will disappear there was a logic problem the js read my code from the top to the bottom
    //when i do reload he see the empty array and when i add new product he add to the empty array all the wrong in the     let dataPro = []; 
    // so we want to check if the array have data or no from if 


    // clearData();
    // callback the clearData function to clear all data in the field
    // move to the top in if (validate)

    showData(); 
    // callback the showData function to show all dat ain the table 
    // this data is opened out the function above 
}


// clear inputs
// when i have any data and add it to the array in localstorage and i want to clear all data in the field 
function clearData(){
    // I want when i click on the Create button all data disappear so i attach this function to the (submit.onclick button)
    // the first thing i want to call all inputs
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    // data is not value so we said innerHTML
    count.value = '';
    category.value = '';
    // now when i add new data and click on the create button the data go to the local storage and the field get empty
}


// read show all products
// now when i add new data and it will store and  the field is empty where is the data?  i want to read it 
function showData(){

    // this line from the updateData paragraph to turn on the red color after update the product 
    getTotal();

    // i want to show this data when i click on teh create button i callback it in create function submit.valu
    // example
    let table = '';
    for(let i=0 ; i<dataPro.length ; i++){
        // table = dataPro[i];
        // i don't want to start my product from zero i want to start from 1 ${i} to ${i+1}
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
                `;   
                
                // how can i get the id in deleteData() it is the number of element index and it is i in the top so i write ${i} and now the index number is sent to function
        // if i want just a title i write dataPro[i].title and so on...
        // console.log(table) to check how the data is coming 
    }
    // i want to add this to the tbody and i put new id in tbody his name is tbody
    document.getElementById('tbody').innerHTML = table;
    // i want to get the data in the field and put it in the table variable all data is in dataPro i want to get it from ther and put it in table 
    // so i add for loop from 0 to the n product (dataPro.length) this loop to get all data in teh array and put it in the table 
    // now i see problem is the ID is [object Object] and nothing else and that is happen because i write innerHTML and want to add new HTNL
    // now i bring one item and add it insid back tick ` ` and add the HTML code there and add += instead = to avoid the line delete 
    // i have a problem that all data is static and i want to convert it to dynamic data and add ${i}, ${dataPro[i].title} and so on...
    // i faced new problem that the old data appear when i clikc on the create button because i don't active this function and i want to call back it out side the function

    // check if the data is founded or not
    let btnDelete = document.getElementById('deleteAll');
    // get the button place from HTML

    if(dataPro.length > 0){
        // if the length of array bigger than 0 that mean there was data founded
        btnDelete.innerHTML = `
            <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
        // i want when i click on this button all data disappear so i add onclick and add function deleteAll() don't have any parameter
        // now i make the button if there is data 
    }else{
        // now if i don't have data 
        btnDelete.innerHTML = '';  
    }

}
showData();


// count
// count rewrite the same procut for the certain number time 
// i want when i add 50 to count he repeat this line 50 times and so on...
// to make this action we go to create button to that function and all operation is there
// in dataPro.push(newPro); in line 75 we want to add just one product but we want to add products as many times of count
// now i want to add number of products in the deleteAll buttons so go to Line 174 and add to deleteAll() method add length of array deleteAll(${dataPro.length}) notes in method but in tag 






// delete
// how can i delete just one function not all data just one 
function deleteData(i){
    // this data take parameter becasue i want to specific one data from id 
    // I want to turn on this function when i click on delete button
    // console.log(i); to check the id is sent from i in top
    dataPro.splice(i, 1)
    // for delete the data i use splice,  the main array have for instance 13 elemetn and i want to delete one element(object) so i write the previous line code and put the index number
    // the first parameter in splice(0, 1) is the index number , and the second parameter is the number of numbers i want to delete it
    // i want to delete in i index and i want to delete one element splice(i, 1); put this just delete from array and the array is connect to localstorage so if i delete from array nothing delete 
    localStorage.product = JSON.stringify(dataPro);
    // i get the array from the localstroage and his name is product and add to it a new array after i delete the element like dataPro but i want to handle it JSON.stringfy(dataPro)
    // now he delete the element but i don't see it else i refrech the page, now i want to refresh the HTML after i delete the element i need to turn on and call back the showData() function every time i delete element
    showData();   
}

// now i want to delete all i have data and this button turn on when we have data and if i click on it all data will disappear
// I want to add this button up the table go to -> HTML 
// at the first i want to check if i have data or no if yes show button else don't show 
// showData() show all data so i go and check inside it  
// now make the deleteAll() function
function deleteAll(){
    // how can i delete all data, data is in two place in localstorage and in array so i want to delete it from two place 
    localStorage.clear();
    // now all data is clear from localstorage but it is appear in the screen and when i refresh the page it will disappear
    // because the showData() get here data from the array so i want to delete all things from ...
    dataPro.splice(0);
    // now it will delete everything and the zero in parameter do that 
    // final thing i want to add showData() function to refresh the place in table
    showData();

}



// update
// I want when i click on update button in any product i want to change the data in it 
// first step if i click on update button all data go to field and fill it and write to change it 
// second step i want to change and modified the data and when i click to update button all data will updated 
// this function turn on when i click on update button go to showData() in Line 149 and add onclick="updateData()" and pass a parameter is the index of item i want to change it 
// make update function and pass index parameter 
function updateData(i){
    // console.log(i); to check that if i click on update that the index is send 
    // i want to move all data to fill field to modified all data from there to there  
    title.value = dataPro[i].title;
    // to move title from bottom to top
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    // notice that i dont get a count or total
    // i notice again that all data is move to field but the total didn't account this function is turn on when i typing using keyboard 
    // so i want to turn on this function everytime i click on update button so we just callback the getTotal() function
    getTotal();
    // i want to remove the count because i want just modified the data not to add it 
    count.style.display = 'none';
    // i want to replace the creat button to update 
    submit.innerHTML = 'Update';
    category.value = dataPro[i].category;
    // i notice that if i modified the data and click update the data is create new data and don't change the old data that i want to modified no go to the line 11 and add let mood = 'create';   
    // i set that the mood in the begining of the programm is creat and if i go to update i want to change it to update
    mood = 'update'; 
    // now if the mood is creat go and creat new product else if mood is update i want to modified the product all in the create button in submit.onclick button go to there and modified the if else
    // do that just in creat mood else don't do that and make new if else 
    tmp = i;
    // i want when the user click on update the scroll is go to the top to update automatic scrollin
    scroll({
        top:0,
        // make scrolling slower
        behavior:'smooth', 
    })


}



// search 
// i want to search about any poduct from name(title) or category
// we make mood again to know the type of searh title or category
// now I have two steps 
// i make a searchMood variable  and the initial value is title it's mean the default is the search by name 
let searchMood = 'title'; 
// // and i want if a click on any button the mood is changed 
function getSearchMood(id){
    let search = document.getElementById('search');
    // this function turn on if i click on this two search button so in HTML i add onclick="getSearchMood"
    // if this function is turn on it back his id mean pass the id as a parameter
    // to get id as parameter just type this.id inside the getSearchMood
    // console.log(id); to check the returned id 
    if(id === 'searchTitle'){
        searchMood = 'title';
        // search.placeholder = 'Search By Title'; 
        // i want to decreaset the lines in my code so i want to transfer the search.placeholder in  if else to out condition
    }else{
        searchMood = 'category';
        // search.placeholder = 'Search By Category';
    }
    search.placeholder = 'Search By '+ searchMood;
    //and this line do the same thing that two line in top do  

    // console.log(serachMood); to check the returned Mood
    // now if i click at any this two block i want to call the search bar i write let search = document.getElementById('search')
    // get this search by using search.focus();
    search.focus();
    // i want to change the placeholder in search box from search.placeholder = 'Search By Title';

    // to fix when search click option change
    search.value = '';
    // but we notice that no data show because i want to turn on the showdata every time i click on this function and to solve it just call back tne showData function
    showData();
}

// now let's work in search function itself 
function searchData(value){
    // i want to turn on this function when i write anything on search block in HTML in input i add onkeyup="searchData(this.value)" and i want the value inside this function using this.value now any thing in this function go to this function
    // console.log(value); to check what i type inside the search block 
    // if the searchMood equal to title the search is by title else another chose
    
    // define table 
    let table = '';

    // to decrease the code lines
    for(let i=0; i<dataPro.length; i++){
        if(searchMood == 'title'){
            // This is search by title 
            // i want to enter to all id and search in all title for all products for a product has the word i want so i want to pass on all product 
            // this function is inside array so i make a for loop 
            // for(let i=0; i<dataPro.length; i++){
                // now i get all product next step is to go inside to all procut title check if it equal it 

                // // // we want to decrease line in my code i notice i have two loop to search in title and category in two case i want to send all products i remove it from the if else and put them in one loop

                // iwant to compaer the value with title 
                if(dataPro[i].title.includes(value.toLowerCase())){
                    // if index title includes the value from search bar reutrn true or false 
                    // console.log(i); to check the reutrned indexes
                    // i want just the index i want it i want all the showData element to come here the table sectoin
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>
                    `;   
                    // if the value is founded in the title he returend true and print new row this row include what i want  and don't forget to define table  
                    // this table i want to put it in tbody so i get the same line from up inside searchData in the bottom 

                }
            // }

        }
        else{
            // This is search by category
            // the same code in the if the difference is just change title to category
            // for(let i=0; i<dataPro.length; i++){
                // now i get all product next step is to go inside to all procut title check if it equal it 
                // We face big problem is when i search about a word that he just search about just uppercase or lowercase word so i go to if and add title.toLowerCase ()
                // or when i get the data in submit.onclick function when i get data from users convert word in line 65 and 73
                // and i want when the user add new data is convert to lowercase too change vlaue to value.toLowerCase()
                // i want when i click on the other search option empty search bar and back everything to the old and preview all data in getSearchMood function 

                // iwant to compaer the value with title 
                if(dataPro[i].category.includes(value.toLowerCase())){
                    // if index title includes the value from search bar reutrn true or false 
                    // console.log(i); to check the reutrned indexes
                    // i want just the index i want it i want all the showData element to come here the table sectoin
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>
                    `;   
                    // if the value is founded in the title he returend true and print new row this row include what i want  and don't forget to define table  
                    // this table i want to put it in tbody so i get the same line from up inside searchData in the bottom 

                }
            // }
            

        }
    }
    document.getElementById('tbody').innerHTML = table;
}   




// clean data (validate)
// i want to know what the user input is it for instance empty title or like so big random number in count do just less than 100 product 
// i want to control the entry data at first go the the creat function submit.onclick i want to enter to creat new product section
// i said don't do this if the data is not ture 



