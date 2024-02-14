import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase-config";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "Art",
  description: "",
  comments: [],
  likes: [],
};

const CreateBlog = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image uploaded to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  const { title, tags, trending, category, description } = form;

  // console.log("form", form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const handleCategory = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user?.displayName,
            userId: user?.uid,
          });
          toast.success("Blog created successfully");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user?.displayName,
            userId: user?.uid,
          });
          toast.success("Blog updated successfully");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };

  return (
    <div className="flex justify-center gap-4 lg:mt-12 mt-1">
      <div className="lg:w-[60rem] p-2">
        <form
          className="lg:flex items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className="w-full lg:space-y-5 space-y-3">
            <h1 className="font-bold">
              {id ? "Update a Post" : "Create a Post"}
            </h1>
            <div className="flex gap-1">
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              maxTags={10}
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              onChange={handleTags}
              id="tag"
              name="tag"
            />
            <div className="flex justify-between">
              <p>Is it trending blog?</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  value="yes"
                  name="radioOption1"
                  id="radioOption1"
                  className="cursor-pointer"
                  onChange={handleTrending}
                  checked={trending === "yes"}
                />
                <label htmlFor="radioOption1" className="cursor-pointer">
                  Yes
                </label>
                <input
                  type="radio"
                  value="no"
                  name="radioOption2"
                  id="radioOption2"
                  className="cursor-pointer"
                  onChange={handleTrending}
                  checked={trending === "no"}
                />
                <label htmlFor="radioOption2" className="cursor-pointer">
                  No
                </label>
              </div>
            </div>

            <div>
              <textarea
                name="description"
                cols="30"
                rows="6"
                placeholder="Description"
                value={description}
                className="w-full border p-2 "
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="flex lg:flex-col gap-2">
            <div className=" border p-3 space-y-3 drop-shadow-sm border-b-2 border-r-2">
              <h1 className="font-bold">{id ? "Update" : "Publish"}</h1>
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  className="border w-full cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                {progress !== null && progress < 100 ? (
                  <>
                    <button
                      type="button"
                      className="bg-[#0facce] text-white flex items-center gap-2 p-2 w-[8rem] rounded-lg"
                      disabled
                    >
                      <FaCircleNotch className="animate-spin" />
                      Uploading...
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="p-2 w-[8rem] bg-[#0facce] rounded-lg text-white"
                    >
                      {id ? "Update" : "Publish"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className=" h-full border p-3 drop-shadow-sm border-b-2 border-r-2">
              <h1 className="font-bold">Category</h1>
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Art"
                    id="categoryOption"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Art"}
                  />
                  <label htmlFor="categoryOption" className="cursor-pointer">
                    Art
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Science"
                    id="categoryOption1"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Science"}
                  />
                  <label htmlFor="categoryOption1" className="cursor-pointer">
                    Science
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Technology"
                    id="categoryOption2"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Technology"}
                  />
                  <label htmlFor="categoryOption2" className="cursor-pointer">
                    Technology
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Cinema"
                    id="categoryOption3"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Cinema"}
                  />
                  <label htmlFor="categoryOption3" className="cursor-pointer">
                    Cinema
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Sports"
                    id="categoryOption6"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Sports"}
                  />
                  <label htmlFor="categoryOption6" className="cursor-pointer">
                    Sports
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Travel"
                    id="categoryOption4"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Travel"}
                  />
                  <label htmlFor="categoryOption4" className="cursor-pointer">
                    Travel
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    value="Design"
                    id="categoryOption5"
                    className="cursor-pointer"
                    onChange={handleCategory}
                    checked={category === "Design"}
                  />
                  <label htmlFor="categoryOption5" className="cursor-pointer">
                    Design
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
