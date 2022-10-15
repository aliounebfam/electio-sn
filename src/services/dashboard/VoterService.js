import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
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
