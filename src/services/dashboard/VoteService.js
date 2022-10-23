import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const voterCollectionRef = collection(db, "votes");