import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getRegionRef } from "./RegionService";

export const departmentCollectionRef = collection(db, "departments");

export const getDocDepartmentRef = (id) => {
    return doc(departmentCollectionRef, id);
}

export const deleteDepartment = async (id) => {
    await deleteDoc(getDocDepartmentRef(id));
}

export const updateDepartment = async (id, data) => {
    if (data?.regionName) {
        data["regionRef"] = getRegionRef(data.regionName.id)
        const regionName = data.regionName.nom;
        delete data["regionName"];
        data["regionName"] = regionName;
    }
    await updateDoc(getDocDepartmentRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )
}

export const addDepartment = async (data) => {
    if (data?.regionNameAndId) {
        data["regionRef"] = getRegionRef(data.regionNameAndId.id)
        delete data.regionNameAndId;
    }
    return await addDoc(departmentCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        }
    )
}

export const getAllDepartments = async () => {
    let departments = [];
    let error = undefined;
    await getDocs(departmentCollectionRef)
        .then((response) => {
            departments = response.docs.map((department) => ({ id: department.id, ...department.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (departments.length != 0) {
        return departments
    }
    else
        return error;
}


export const getDepartmentsFromRegionName = async (regionName) => {
    let departments = [];
    const q = query(departmentCollectionRef, where("regionName", "==", regionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        departments.push({ id: doc.id, ...doc.data() })
    });
    return departments;
}

export const getDepartmentFromMunicipality = async (departmentRef) => {
    let department = undefined;
    department = await getDoc(departmentRef);
    if (department.exists()) {
        return { id: department.id, ...department.data() };
    };
}
