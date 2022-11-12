import { collection, doc, getDocs, serverTimestamp, query, where, increment, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getDepartmentFromMunicipality } from "./DepartmentService";
import { getDistrictFromName } from "./DistrictService";
import { getMunicipalityFromDistrict } from "./MunicipalitieService";
import { getRegionFromMunicipality } from "./RegionService";

export const votesCollectionRef = collection(db, "votes");

const actualYearToString = new Date().getFullYear().toString();

export const getVoteRef = (id) => {
    return doc(votesCollectionRef, id)
}

export const updateVoteData = async (data) => {
    let district = undefined
    let municipality = undefined
    let department = undefined
    let region = undefined

    await getDistrictFromName(data.voterDistrict)
        .then((r) => district = r);
    await getMunicipalityFromDistrict(district.municipalitieRef)
        .then(r => municipality = r);
    await getDepartmentFromMunicipality(municipality.departmentRef)
        .then(r => department = r);
    await getRegionFromMunicipality(department.regionRef)
        .then(r => region = r);
    await setDoc(
        getVoteRef(actualYearToString),
        {
            "candidates": {
                [data.candidateId]: increment(1)
            },
            "regions": {
                [region.id]: {
                    [data.candidateId]: increment(1),
                }
            },
            "departments": {
                [department.id]: {
                    [data.candidateId]: increment(1),
                }
            },
            "municipalities": {
                [municipality.id]: {
                    [data.candidateId]: increment(1),
                }
            },
            "districts": {
                [district.id]: {
                    [data.candidateId]: increment(1),
                }
            },
            updated_at: serverTimestamp()
        },
        { merge: true }
    );
}