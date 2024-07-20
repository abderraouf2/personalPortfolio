import { db, storage } from "@/lib/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log({ QUERY: req.query });
    const { id } = req.query;
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const url = await getDownloadURL(ref(storage, docSnap.data().bannerImg));
      let newBlg = {
        id: docSnap.id,
        title: docSnap.data().title,
        description: docSnap.data().description,
        timeToRead: docSnap.data().timeToRead,
        categories: docSnap.data().categories,
        bannerImg: url,
        content: docSnap.data().content,
      };
      console.log("Document data:", newBlg);
      res.status(200).json({ data: newBlg });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      res.status(404).json({ data: "No such document!" });
    }
  }
}
