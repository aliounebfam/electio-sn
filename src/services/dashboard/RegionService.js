import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const regionCollectionRef = collection(db, "regions");

export const getRegionRef = (id) => {
    return doc(regionCollectionRef, id)
}

export const getRegionName = async (ref) => {
    let regionName = undefined;
    await getDoc(ref).then((response) => {
        const { nom } = response.data();
        regionName = nom
    })
    return regionName;
}

export const deleteRegion = async (id) => {
    await deleteDoc(getRegionRef(id))
}

export const updateRegion = async (id, data) => {
    await updateDoc(getRegionRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )
}

export const addRegion = async (data) => {
    await addDoc(regionCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        }
    )
}

export const getAllRegionsNameAndId = async () => {
    let regionsName = [];
    let errors = undefined;
    await getDocs(regionCollectionRef)
        .then((response) => {
            regionsName = response.docs.map(region => ({ id: region.id, nom: region.data().nom }))
        })
        .catch(errs => {
            errors = { error: true, message: errs }
        })
    if (regionsName.length != 0) {
        return regionsName
    }
    else
        return errors;
}


export const getAllRegions = async () => {
    let regions = [];
    let error = undefined;

    await getDocs(regionCollectionRef)
        .then((response) => {
            regions = response.docs.map(region => ({ id: region.id, ...region.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (regions.length != 0) {
        return regions
    }
    else
        return error;
}

export const getRegionFromMunicipality = async (regionRef) => {
    let region = undefined;
    region = await getDoc(regionRef);
    if (region.exists()) {
        return { id: region.id, ...region.data() };
    };
}
