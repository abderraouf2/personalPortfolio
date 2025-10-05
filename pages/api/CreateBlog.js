import { db, storage } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, bannerImg, description, categories, content, timeToRead } =
      req.body;
    const storage = getStorage();
    let id = uuidv4();
    let pathToImg = `blog-images/${id}`;
    const storageRef = ref(storage, pathToImg);

    uploadString(storageRef, bannerImg, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      console.log({ snapshot: snapshot });
    });
    const docRef = await addDoc(collection(db, "blogs"), {
      title: title,
      description: description,
      categories: categories,
      bannerImg: pathToImg,
      timeToRead: timeToRead,
      content: content,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ msg: "Success" });
  }
  if (req.method === "GET") {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    let blogs = [];

    for (const doc of querySnapshot.docs) {
      try {
        const data = doc.data();
        const url = await getDownloadURL(ref(storage, data.bannerImg));

        const newBlog = {
          id: doc.id,
          title: data.title,
          description: data.description,
          timeToRead: data.timeToRead,
          categories: data.categories,
          bannerImg: url,
        };

        blogs.push(newBlog);
      } catch (error) {
        console.error("Error fetching download URL:", error);
      }
    }

    // await Promise.all(promises);

    console.log({ blogs });
    res.status(200).json({ msg: "GET request", data: blogs });

    // console.log({ blogs });
    // res.status(200).json({ msg: "GET request", data: blogs });
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
}
