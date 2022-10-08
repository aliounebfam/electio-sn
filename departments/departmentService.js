import { addDoc, collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";

export const departmentCollectionRef = collection(db, "departments");

export const getDocDepartmentRef = (id) => {
    return doc(departmentCollectionRef, id)
}

export const addDepartment = (data) => {
    return addDoc(departmentCollectionRef, {
        ...data,
        created_at: serverTimestamp()
    })
}

