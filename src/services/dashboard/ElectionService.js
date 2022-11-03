import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const electionCollectionRef = collection(db, "elections");
const actualYearToString = new Date().getFullYear().toString();

export const getElectionRef = (id) => {
    return doc(electionCollectionRef, id)
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
        }).then(() => setDoc(doc(db, "votes", actualYearToString), {}))
        ;

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

export const getElectionStateFromCurrentYear = async () => {
    let electionState = undefined;
    const q = query(electionCollectionRef, where("year", "==", new Date().getFullYear()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        electionState = doc.data().state;
    });
    return electionState;
}