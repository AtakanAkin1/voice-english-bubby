import {
    collection,
    addDoc,
    Timestamp,
    query,
    getDocs,
    startAt,
    endAt,
    where,
    orderBy, doc, getDoc, updateDoc,
} from "firebase/firestore";
import {db} from "../firabase/firebase";
import {WordTypes} from "@/constants/wordTypes";
import {WordStatus} from "@/constants/wordStatus";
import {auth} from "@/lib/firabase/firebase";

//#region Interfaces
export interface ICreate{
    word: string;
    definition?: string;
    example?: string;
    wordType: number;
    wordStatus: number;
    searchText: string;
}

export interface IVocabulary {
    id: string;
    word: string;
    definition?: string;
    example?: string;
    wordType: WordTypes;
    wordStatus: WordStatus;
    createdAt: any;
}

export  interface  IUpdate{
    id: string;
    word: string;
    definition?: string;
    example?: string;
    wordType: number;
    wordStatus: number;
    searchText: string;
}
//#endregion

//#region Queries
export const getVocabularies = async (): Promise<IVocabulary[]> => {
    try {
        const uid = auth.currentUser?.uid;
        if(!uid) return [];

        const q = query (
            collection(db, "vocabularies"),
            where("userId","==",uid),
            orderBy("createdAt", "desc")
        );

        const snapshot  = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<IVocabulary, "id">),
        }));
    } catch (e) {
        throw e;
    }
}

export const getVocabularyById = async (id: string): Promise<IVocabulary> => {
    try {
        const docRef = doc(db, "vocabularies", id);
        const vocabulary = await getDoc(docRef);

        return {
            id: vocabulary.id,
            ...(vocabulary.data() as Omit<IVocabulary, "id">)
        }

    } catch (e) {
        throw e;
    }
}

export const getVocabulariesBySearch = async (search: string): Promise<IVocabulary[]> => {
    try {
        if(!search.trim()) return [];

        const uid = auth.currentUser?.uid;
        if(!uid) return [];

        const q = query(
            collection(db, "vocabularies"),
            where("userId","==",uid),
            orderBy("searchText"),
            startAt(search),
            endAt(`${search}\uf8ff`)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<IVocabulary, "id">),
        }));
    }catch (e) {
        throw e;
    }
}
//#endregion

//#region Commands
export const addVocabulary = async (data: ICreate) => {
    try {
        const uid = auth.currentUser?.uid;

        const ref = await addDoc(collection(db, "vocabularies"), {
            ...data,
            userId: uid,
            createdAt: Timestamp.now()
        });

        return ref.id;
    } catch (e: any) {
        throw e;
    }
};

export const updateVocabulary = async (data: IUpdate): Promise<IVocabulary> => {
    try {
        const {id, ...rest} = data;
        const ref = doc(db, "vocabularies",id);

        await updateDoc(ref,rest);
        const snapshot = await getDoc(ref);

        return {
            id: snapshot.id,
            ...(snapshot.data() as Omit<IVocabulary, "id">)
        }
    } catch (e: any) {
        throw e;
    }
}
//#endregion