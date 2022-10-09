import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getDocDepartmentRef } from "./DepartmentService";
import { getRegionRef } from "./RegionService";

export const municipalitieCollectionRef = collection(db, "municipalities");

export const getDocMunicipalitieRef = (id) => {
    return doc(municipalitieCollectionRef, id)
}

export const deleteMunicipalitie = async (id) => {
    await deleteDoc(getDocMunicipalitieRef(id))
}

export const updateMunicipalitie = async (id, data) => {
    if (data?.regionName) {
        data["regionRef"] = getRegionRef(data.regionName.id)
        const regionName = data.regionName.nom;
        delete data["regionName"];
        data["regionName"] = regionName;
    }
    await updateDoc(getDocMunicipalitieRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )
}

export const addMunicipalitie = async (data) => {
    if (data?.regionNameAndId) {
        data["regionRef"] = getRegionRef(data.regionNameAndId.id)
        delete data.regionNameAndId;
    }
    if (data?.departmentNameAndId) {
        data["departmentRef"] = getDocDepartmentRef(data.departmentNameAndId.id)
        delete data.departmentNameAndId;
    }
    return await addDoc(municipalitieCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        }
    )
}

export const getAllMunicipalities = async () => {
    let municipalities = [];
    let error = undefined;
    await getDocs(municipalitieCollectionRef)
        .then((response) => {
            municipalities = response.docs.map((municipalitie) => ({ id: municipalitie.id, ...municipalitie.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (municipalities.length != 0) {
        return municipalities
    }
    else
        return error;
}

export const getMunicipalitiesFromDepartmentName = async (departmentName) => {
    let municipalitie = [];
    const q = query(municipalitieCollectionRef, where("departmentName", "==", departmentName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        municipalitie.push({ id: doc.id, ...doc.data() })
    });
    return municipalitie;
}