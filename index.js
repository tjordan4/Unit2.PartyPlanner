    // Setup 
    // 1. References
    // 2. State 


const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/tyson-jordan'

let events = [];

const eventContainer = document.getElementById('events')

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

//Events Lisenters
// const form = document.getElementById('form');
// form.addEventListener('submit', async (event) =>{
//     event.preventDefault();

//     const formData = form.element 

//     let {name, date, location, description} = formData

//     const newEvent = {
//         name: name.value,
//         date: date.value,
//         location: location.value,
//         description: description.value
//     }

//     const response = await fetch(`${BASE_URL}/events/${id.value}` ,{
//         method: 'PUSH',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.strongify(newEvent),
//     });

//     const json = await response.json();

//     events = await getEvents()
//     renderEvents()
// })


// Render Functions
function renderEvents (){
    const htmlEvents = events.map(evt => {
        let div = document.createElement("div");

        div.className = 'card';

        div.innerHTML = `<h2>${evt.name}</h2>
                        <p>${evt.date}</p>
                        <p>${evt.location}</p>
                        <p>${evt.description}</p>`;

        return div;
    })

    eventContainer.replaceChildren(...htmlEvents)
}

async function startApp(){
    events = await getEvents()

    renderEvents()
}

startApp()