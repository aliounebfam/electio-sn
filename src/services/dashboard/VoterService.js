import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const voterCollectionRef = collection(db, "voters");

export const getVoterRef = (id) => {
    return doc(voterCollectionRef, id)
}

export const addVoter = async (data) => {
    await addDoc(voterCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        }
    )
}

export const deleteVoter = async (id) => {
    await deleteDoc(getVoterRef(id))
}

export const updateVoter = async (id, data) => {
    await updateDoc(getVoterRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )
}

export const getAllVoters = async () => {
    let voters = [];
    let error = undefined;
    await getDocs(voterCollectionRef)
        .then((response) => {
            voters = response.docs.map(voter => ({ id: voter.id, ...voter.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (error == undefined) {
        return voters
    }
    else
        return error;
}

export const getVoterDataFromEmail = async (email) => {
    let voter = undefined;
    const q = query(voterCollectionRef, where("emailAddress", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        voter = { id: doc.id, ...doc.data() };
    });
    return voter;
}

export const isEmailAddressAlreadyUsed = async (email) => {
    let isAlreadyUsed = false;
    const q = query(voterCollectionRef, where("emailAddress", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc)
            isAlreadyUsed = true;
    });
    return isAlreadyUsed;
}

export const getAllCandidateFromSpecificYear = async (year) => {
    let candidates = [];
    let error = null;
    const q = query(voterCollectionRef, where("candidateYears", "array-contains", year), orderBy("firstName"));
    // const q = query(voterCollectionRef, where("candidateYears", "array-contains", year));
    await getDocs(q)
        .then((response) => {
            candidates = response.docs.map(candidate => ({ id: candidate.id, ...candidate.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (error == undefined) {
        return candidates
    }
    else
        return error;
}