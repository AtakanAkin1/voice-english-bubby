import {
    collection,
    addDoc,
    Timestamp,
    query,
    getDocs,
    orderBy, doc, getDoc,
} from "firebase/firestore";
import {db} from "./firebase";
import {WordTypes} from "@/constants/wordTypes";
import {WordStatus} from "@/constants/wordStatus";

export interface ICreate{
    word: string;
    definition?: string;
    example?: string;
    wordType: number;
    wordStatus: number;
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

export const addVocabulary = async (data: ICreate) => {
    try {
        const ref = await addDoc(collection(db, "vocabularies"), {
            ...data,
            createdAt: Timestamp.now()
        });

        return ref.id;
    } catch (e: any) {
        throw e;
    }
};

export const getVocabularies = async (): Promise<IVocabulary[]> => {
    try {
        const q = query (
          collection(db, "vocabularies"),
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
