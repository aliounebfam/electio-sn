import { addDepartment } from './departmentService.js';

import data from './../assets/locations.json';
import results from './../assets/elections_results.json';



let coordinateDepartments = results.map((result) => {
    delete result['BBY presi'];
    delete result['IdrissaSeck presi'];
    delete result['IssaSall presi'];
    delete result['PASTEF presi'];
    delete result['Madick�Niang presi'];
    return result;
})


// console.log("Dakar".toUpperCase() === "DAKAR");

const [dakarCoordinate] = coordinateDepartments.filter((department) => department.Departement == "MBOUR")
console.log(dakarCoordinate.Latitude);




let regions = Object.keys(data);


for (let i = 0; i < regions.length; i++) {

    let departments = Object.keys(data[regions[i]])

    for (let j = 0; j < departments.length; j++) {
        const [departmentCoordinate] = coordinateDepartments.filter((department) => department.Departement === departments[j].toUpperCase())
        console.log({ nom: departments[j].charAt(0).toUpperCase() + departments[j].slice(1), latitude: departmentCoordinate.Latitude, longitude: departmentCoordinate.Longitude, regionName: regions[i] });
    }

}