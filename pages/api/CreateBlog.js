import { db, storage } from "@/lib/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
    });
    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ msg: "Success" });
  }
  if (req.method === "GET") {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const storage = getStorage();
    let blogs = [];

    const promises = querySnapshot.docs.map(async (doc) => {
      try {
        const url = await getDownloadURL(ref(storage, doc.data().bannerImg));
        let newBlg = {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          timeToRead: doc.data().timeToRead,
          categories: doc.data().categories,
          bannerImg: url,
        };
        console.log({ newBlg });
        blogs.push(newBlg);

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
        // const img = document.getElementById("myimg");
        // img.setAttribute("src", url);
      } catch (error) {
        console.error("Error fetching download URL:", error);
      }
    });

    await Promise.all(promises);

    console.log({ blogs });
    res.status(200).json({ msg: "GET request", data: blogs });

    // console.log({ blogs });
    // res.status(200).json({ msg: "GET request", data: blogs });
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
}
