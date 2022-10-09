import { addDepartment } from './departmentService.js';
import { getDataSpecificRegionFromName, getDocRegionRef } from '../regions/regionService.js';
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

let regions = Object.keys(data);

for (let i = 0; i < regions.length; i++) {

    let departments = Object.keys(data[regions[i]])

    for (let j = 0; j < departments.length; j++) {

        const [departmentCoordinate] = coordinateDepartments.filter(
            (department) => department.Departement === departments[j].toUpperCase()
        )
        const nom = departments[j].charAt(0).toUpperCase() + departments[j].slice(1);
        const latitude = departmentCoordinate.Latitude;
        const longitude = departmentCoordinate.Longitude;
        const regionName = regions[i];
        let regionId = undefined;

        let department = { nom, latitude, longitude, regionName }

        await getDataSpecificRegionFromName(regionName).then(r => regionId = r.id);

        department["regionRef"] = getDocRegionRef(regionId);

        addDepartment(department);
    }
}






