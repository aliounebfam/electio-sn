import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getDocDepartmentRef } from "./DepartmentService";
import { getDocMunicipalitieRef } from "./MunicipalitieService";
import { getRegionRef } from "./RegionService";

export const districtCollectionRef = collection(db, "districts");

export const getDocDistrictRef = (id) => {
    return doc(districtCollectionRef, id)
}

export const deleteDistrict = async (id) => {
    await deleteDoc(getDocDistrictRef(id))
}

export const updateDistrict = async (id, data) => {
    if (data?.regionName) {
        data["regionRef"] = getRegionRef(data.regionName.id)
        const regionName = data.regionName.nom;
        delete data["regionName"];
        data["regionName"] = regionName;
    }
    await updateDoc(getDocDistrictRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )
}

export const addDistrict = async (data) => {
    if (data?.regionNameAndId) {
        data["regionRef"] = getRegionRef(data.regionNameAndId.id)
        delete data.regionNameAndId;
    }
    if (data?.departmentNameAndId) {
        data["departmentRef"] = getDocDepartmentRef(data.departmentNameAndId.id)
        delete data.departmentNameAndId;
    }
    if (data?.municipalitieNameAndId) {
        data["municipalitieRef"] = getDocMunicipalitieRef(data.municipalitieNameAndId.id)
        delete data.municipalitieNameAndId;
    }
    return await addDoc(districtCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        }
    )
}

export const getAllDistricts = async () => {
    let districts = [];
    let error = undefined;
    await getDocs(districtCollectionRef)
        .then((response) => {
            districts = response.docs.map((district) => ({ id: district.id, ...district.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (districts.length != 0) {
        return districts
    }
    else
        return error;
}

export const getDistrictFromName = async (districtName) => {
    let district = undefined;
    const q = query(districtCollectionRef, where("nom", "==", districtName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        district = { id: doc.id, ...doc.data() };
    });
    return district;
}
