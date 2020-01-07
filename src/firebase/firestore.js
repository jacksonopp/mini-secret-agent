// thanks brian: github.com/bcbrian
import { useState, useEffect } from "react";
import { isEqual } from "lodash";
import { firebase } from "./";
export const db = firebase.firestore();

/*
add
-- doc +
-- endAt =
-- endBefore =
-- get $
isEqual
-- limit =
-- onSnapshot $
-- orderBy =
-- startAfter =
-- startAt =
-- where =
CCCCCCCCC
-- update
-- set
*/

export function useFirestore(collection, isRealTime = true, newOpts = {}) {
  if (typeof isRealTime !== "boolean") {
    newOpts = isRealTime;
    isRealTime = true;
  }
  const [documentSnapshots, setData] = useState([]);
  const [collectionRef, setCollectionRef] = useState(null);

  const [opts, setOpts] = useState(newOpts);
  // We are controlling equality!
  useEffect(() => {
    if (!isEqual(newOpts, opts)) {
      setOpts(newOpts);
    }
  }, [newOpts, opts]);

  useEffect(() => {
    let dbRef = db.collection(collection);
    setCollectionRef(dbRef);

    const methods = Object.keys(opts);

    if (methods.includes("doc") && methods.length > 1) {
      throw new Error(
        "Look at the docs here things dont work this way. Once you choose a doc you can only do these methods. \n" +
        "https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference.html"
      );
    }

    for (let i = 0; i < methods.length; i++) {
      const method = methods[i];
      let args = opts[method];
      if (Array.isArray(args[0])) {
        for (let j = 0; j < args.length; j++) {
          const innerArgs = Array.isArray(args[j]) ? args[j] : [args[j]];

          dbRef = dbRef[method](...innerArgs);
        }
      } else {
        args = Array.isArray(args) ? args : [args];

        dbRef = dbRef[method](...args);
      }
    }

    let cleanup = () => { };

    if (!isRealTime) {
      dbRef.get().then(function (querySnapshot) {
        if (!querySnapshot.forEach) {
          setData([querySnapshot]);
        } else {
          const documentSnapshots = [];
          querySnapshot.forEach(function (doc) {
            documentSnapshots.push(doc);
          });
          setData(documentSnapshots);
        }
      });
    } else {
      cleanup = dbRef.onSnapshot(function (querySnapshot) {
        if (!querySnapshot.forEach) {
          setData([querySnapshot]);
        } else {
          const documentSnapshots = [];
          querySnapshot.forEach(function (doc) {
            documentSnapshots.push(doc);
          });
          setData(documentSnapshots);
        }
      });
    }
    return cleanup;
  }, [collection, isRealTime, opts]);
  return {
    documentSnapshots,
    collectionRef
  };
}

// function Component() {
//   const {
//     documentSnapshots,
//     ref,
//   } = useFirestore("users");
//   return <div>{documentSnapshots.map(d => <div>{d.data()}</div>)}</div>
// }