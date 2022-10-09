import { addDoc, collection, doc, getDocs, serverTimestamp, query, where, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";


export const regionCollectionRef = collection(db, "regions");

export const getDocRegionRef = (id) => {
    return doc(regionCollectionRef, id)
}

export const addRegion = (data) => {
    return addDoc(regionCollectionRef, {
        ...data,
        created_at: serverTimestamp()
    })
}

export const getRegions = async () => {
    let regions = [];
    let errors = undefined;

    await getDocs(regionCollectionRef)
        .then((response) => {
            regions = response.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        })
        .catch(errs => {
            errors = { error: true, message: errs }
        })

    if (regions.length != 0)
        return regions;
    else
        return errors;
}

export const getDataSpecificRegionFromName = async (regionName) => {
    let region = undefined;
    const regionRef = query(regionCollectionRef, where("nom", "==", regionName));
    const querySnapshot = await getDocs(regionRef);
    querySnapshot.forEach((doc) => {
        region = { id: doc.id, ...doc.data() };
    });
    return region;
}