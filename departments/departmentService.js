import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
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

export const getDataSpecificDepartmentFromName = async (departmentName) => {
    let department = undefined;
    const departmentRef = query(departmentCollectionRef, where("nom", "==", departmentName));
    const querySnapshot = await getDocs(departmentRef);
    querySnapshot.forEach((doc) => {
        department = { id: doc.id, ...doc.data() };
    });
    return department;
}