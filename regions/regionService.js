import { addDoc, collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
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

const getRegions = (() => {
    getDocs(regionCollectionRef)
        .then((response) => {
            console.log(response.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        .catch(errs => {
            console.log({ error: true, message: errs })
        })
})()

