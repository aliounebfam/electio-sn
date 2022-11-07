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
    let newElectionId = undefined;
    await addDoc(electionCollectionRef,
        {
            ...data,
            created_at: serverTimestamp()
        })
        .then(
            (response) => {
                newElectionId = response.id;
                setDoc(doc(db, "votes", actualYearToString), {});
            }
        );
    return newElectionId;
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

export const getElectionDataFromSpecificYear = async (year) => {
    let election = undefined;
    const q = query(electionCollectionRef, where("year", "==", year));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        election = { id: doc.id, ...doc.data() };
    });
    return election;
}

// export const isElectionYearExistAndIsInProgressStateOrIsInStoppedState = async (year) => {
//     let isExistAndIsInProgressStateOrIsInStoppedState = false;
//     const q = query(electionCollectionRef, where("year", "==", year));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         if (doc && (doc.data().state == "inProgress" || doc.data().state == "stopped"))
//             isExistAndIsInProgressStateOrIsInStoppedState = true;
//     });
//     return isExistAndIsInProgressStateOrIsInStoppedState;
// }

export const getAllElectionsInProgressStateOrInStoppedState = async () => {
    let electionsInProgressStateOrInStoppedState = [];
    let error = undefined;

    await getDocs(electionCollectionRef)
        .then((response) => {
            electionsInProgressStateOrInStoppedState = response.docs.map(election => {
                if (election.data().state == "inProgress" || election.data().state == "stopped")
                    return { id: election.id, ...election.data() };
            })
        })
        .catch(errs => {
            error = { error: true, message: errs }
        })
    if (electionsInProgressStateOrInStoppedState.length != 0) {
        return electionsInProgressStateOrInStoppedState
    }
    else
        return error;
}