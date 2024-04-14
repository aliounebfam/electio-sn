import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase.js";

export const municipalityCollectionRef = collection(db, "municipalities");

export const getDocMunicipalityRef = (id) => {
    return doc(municipalityCollectionRef, id)
}

export const addMunicipality = (data) => {
    return addDoc(municipalityCollectionRef, {
        ...data,
        created_at: serverTimestamp()
    })
}

export const getDataSpecificMunicipalityFromName = async (municipalityName) => {
    let municipality = undefined;
    const municipalityRef = query(municipalityCollectionRef, where("nom", "==", municipalityName));
    const querySnapshot = await getDocs(municipalityRef);
    querySnapshot.forEach((doc) => {
        municipality = { id: doc.id, ...doc.data() };
    });
    return municipality;
}