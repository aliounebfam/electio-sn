import fetch from 'node-fetch';
import { addRegion } from './regionService.js';


let regions = [
    "Dakar",
    "Diourbel",
    "Fatick",
    "Kaolack",
    "Kolda",
    "Louga",
    "Matam",
    "Saint-Louis",
    "Tambacounda",
    "Thies",
    "Ziguinchor",
    "Sedhiou",
    "Kaffrine",
    "Kedougou",
]


let counter = 0;
let interval = setInterval(() => {
    let url = `https://geocode.xyz/?region=SN&locate=${regions[counter]}&geoit=JSON&auth=452442941980834558251x34423`;

    fetchCoordinateRegions(url);

    if (counter == 13) {
        clearInterval(interval);
    }
    counter++;

}, 1000);



const fetchCoordinateRegions = async (url) => {
    let result = {}
    await fetch(url)
        .then(response => response.json())
        .then((data) => {
            if (data.standard?.city) {
                const { longt: longitude, latt: latitude, standard: { city: nom } } = data;
                result = { nom, longitude, latitude }
            }
            else {
                console.log(data.standard);
            }
        })
        .catch((err) => console.log(err))

    addRegion(result);
}
