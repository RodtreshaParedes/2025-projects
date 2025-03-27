import {useEffect, useState} from "react";
import {Movie} from "@/typings";
import {collection, DocumentData, onSnapshot, query} from "firebase/firestore";
import {db} from "@/firebase";

function useList(uid: string | undefined) {
    const [list, setList] = useState<Movie[] | DocumentData[]>([]);

    useEffect(() => {
        if (!uid) return;

        const listRef = collection(db, "users", uid, "myList");
        const q = query(listRef);

        return onSnapshot(q, (snapshot) => {
            setList(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));
        });
    }, [db, uid]);

    return list;
}

export default useList;
