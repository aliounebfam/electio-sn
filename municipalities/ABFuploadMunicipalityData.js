import fetch from "node-fetch";
import { getDataSpecificDepartmentFromName, getDocDepartmentRef } from "../departments/departmentService.js";
import { getDataSpecificRegionFromName, getDocRegionRef } from "../regions/regionService.js";
// import data from "./../assets/locations.json" assert { type: "json" };
import data from "./../assets/locations.json";
import { addMunicipality } from "./municipalityService.js";


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

let count = 0;

for (let region in data) {
    let departments = data[region];
    for (let department in departments) {
        let municipalities = departments[department];
        for (const municipality of municipalities) {
            await delay(500);
            fetchCoordinateMunicipalityFromName(municipality)
                .then(
                    async (response) => {
                        if (!Object.values(response).includes(undefined)) {
                            let municipalityDataToSendFirestore = {
                                regionName: region,
                                departmentName: department,
                                nom: municipality,
                                ...response
                            }

                            await getDataSpecificRegionFromName(municipalityDataToSendFirestore.regionName)
                                .then(r => municipalityDataToSendFirestore["regionRef"] = getDocRegionRef(r.id));

                            await getDataSpecificDepartmentFromName(municipalityDataToSendFirestore.departmentName)
                                .then(r => municipalityDataToSendFirestore["departmentRef"] = getDocDepartmentRef(r.id));

                            addMunicipality(municipalityDataToSendFirestore);

                            console.log(count++);
                        }
                    }
                );
        }
    }
}

// 535communes