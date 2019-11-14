// Reference: 
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// GET
async function BasicGet(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    DataHandler(data);
}

// GET
async function AdvancedGet(){
    try 
    {
        const data = await getData('https://jsonplaceholder.typicode.com/posts');
        DataHandler(data);
    } catch (error) {
        console.error(error);
    }
}

async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer'
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

// POST
function BasicPost() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const johndoe = { title: 'Foo', body: 'bar', id: 1 }

    var request = new Request(url, {
        credentials: 'same-origin',
        method: 'POST',             // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(johndoe), // Use correct payload (matching 'Content-Type')
        headers: { 
            'Content-Type': 'application/json; charset=UTF-8' 
        },
    });

    fetch(request)
        .then(response => response.json())
        .then(data => {
            DataHandler(data);
        })
        .catch(error => console.error(error))
}

// POST
async function AdvancedPost(){
    try 
    {
        const data = await postData('https://jsonplaceholder.typicode.com/posts', { title: 'Foo', body: 'bar', id: 1 });
        DataHandler(data);
    } catch (error) {
        console.error(error);
    }
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

// Error Handling 
function ErrorHandling()
{
    const url = 'https://jsonplaceholder.typicode.com/posts1';
    var request = new Request(url, {
        method: 'GET',
        headers: new Headers()
    });

    fetch(request)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                switch(response.status) {
                    case 404:
                        throw new Error('404 - Not found');
                    break;
                    default:
                        throw new Error('An error occured.');
                }
                return null;
            }
        })
        .then(data => {
            if (data !== null){
                DataHandler(data);
            }
        })
        .catch(err => {
            console.log('An error occured:', err);
        });
}

// POST Form
function PostForm(){

    const formData = new FormData(document.querySelector('form#myForm'))
    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url, {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: formData  // a FormData will automatically set the 'Content-Type'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

// Handle the data
function DataHandler(data){
    var p = document.getElementById("Result");
    p.innerHTML = JSON.stringify(data);
}

// Clear the results
function Clear(){
    var p = document.getElementById("Result");
    p.innerHTML = '';
}

