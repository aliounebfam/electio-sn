import fetch from "node-fetch";
// import data from "./../assets/locations.json" assert { type: "json" };
import data from "./../assets/locations.json";


const fetchCoordinateMunicipalityFromName = async (municipalityName) => {

    const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${municipalityName}&country=senegal`;

    let latitude = undefined;
    let longitude = undefined;

    await fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            longitude = response?.data?.meta?.longitude;
            latitude = response?.data?.meta?.latitude;
        })
    return { longitude, latitude };
}

const delay = async (ms = 1000) =>
    new Promise(resolve => setTimeout(resolve, ms))


for (let region in data) {
    let departments = data[region];
    for (let department in departments) {
        let municipalities = departments[department];
        for (const municipality of municipalities) {
            await delay(175);
            fetchCoordinateMunicipalityFromName(municipality)
                .then(
                    response => {
                        if (!Object.values(response).includes(undefined)) {
                            console.log({
                                regionName: region,
                                departmentName: department,
                                nom: municipality,
                                ...response
                            })
                        }
                    }
                );
        }
    }
}