    // Setup 
    // 1. References
    // 2. State 


const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/tyson-jordan'

let events = [];

const eventContainer = document.getElementById('events')

const form = document.querySelector('.form')

form.addEventListener('submit', addEvent)
// Fetch

async function getEvents() {
    try {
        const response = await fetch(`${BASE_URL}/events`)
        const json = await response.json()

        return json.data
    }   catch(err) {
        console.error(err)
    }
}

async function addEvent(event){
    event.preventDefault();
    try {
        const response = await fetch(`${BASE_URL}/events`, {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: form.name.value,
                location: form.location.value,
                date: new Date(form.date.value).toISOString(),
                description: form.description.value
            })
        })
        events = await getEvents();
        renderEvents ()
    }   catch (err) {
        console.error(err);
    }
}

//Events Lisenters



// Render Functions
function renderEvents (){

    const htmlEvents = events.map(evt => {
        let div = document.createElement("div");

        div.className = 'card';

        div.innerHTML = `<h2>${evt.name}</h2>
                        <p>${evt.date}</p>
                        <p>${evt.location}</p>
                        <p>${evt.description}</p>`;
        let button = document.createElement("button")
        button.innerText = "Delete"
        button.addEventListener('click', ()=> deleteEvent(evt.id))
        div.appendChild(button)
        return div;
    })

    eventContainer.replaceChildren(...htmlEvents)
}

async function deleteEvent(id){
    try{
        const del = await fetch(`${BASE_URL}/events/${id}`, {
            method: 'DELETE'
        })
        events = await getEvents();
        renderEvents();
    } catch (err) {
        console.error(err)
    }
}

async function startApp(){
    events = await getEvents()

    renderEvents()
}

startApp()