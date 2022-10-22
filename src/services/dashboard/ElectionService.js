import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const electionCollectionRef = collection(db, "elections");

export const getElectionRef = (id) => {
    return doc(electionCollectionRef, id)
}

export const getElectionName = async (ref) => {
    let electionName = undefined;
    await getDoc(ref).then((response) => {
        const { nom } = response.data();
        electionName = nom
    })
    return electionName;
}

export const deleteElection = async (id) => {
    await deleteDoc(getElectionRef(id))
}

export const updateElection = async (id, data) => {
    await updateDoc(getElectionRef(id),
        {
            updated_at: serverTimestamp(),
            ...data
        }
    )
}

export const addElection = async (data) => {
    await addDoc(electionCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        }
    );
}

export const getAllElectionsNameAndId = async () => {
    let electionsName = [];
    let errors = undefined;
    await getDocs(electionCollectionRef)
        .then((response) => {
            electionsName = response.docs.map(election => ({ id: election.id, nom: election.data().nom }))
        })
        .catch(errs => {
            errors = { error: true, message: errs }
        })
    if (electionsName.length != 0) {
        return electionsName
    }
    else
        return errors;
}


export const getAllElections = async () => {
    let elections = [];
    let error = undefined;

    await getDocs(electionCollectionRef)
        .then((response) => {
            elections = response.docs.map(election => ({ id: election.id, ...election.data() }))
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (elections.length != 0) {
        return elections
    }
    else
        return error;
}
