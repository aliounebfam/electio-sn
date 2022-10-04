import { collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const regionCollectionRef = collection(db, "regions");

export const getDocRegionRef = (id) => {
    return doc(db, "regions", id)
}

export const deleteRegion = async (id) => {
    await deleteDoc(getDocRegionRef(id))
}

export const updateRegion = async (id, data) => {
    await updateDoc(getDocRegionRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )

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
        return regions
    else
        return errors;
}

