import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { modalAtom } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebaseConfig/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

function Modal() {
  const [open, setOpen] = useRecoilState(modalAtom);
  const [imgPev, setImgPev] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const { data: session } = useSession();

  const uplodeHandler = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.username,
      caption: caption,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imgRef = ref(storage, `/posts/${docRef.id}/image`);

    await uploadString(imgRef, imgPev, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imgRef);

      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    });

    setOpen(false);
    setCaption("");
    setImgPev(null);
    setLoading(false);
  };

  console.log(imgPev);

  const imgHandler = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImgPev(readerEvent.target.result);
    };
  };



  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium mx-auto leading-6 text-gray-900"
                  >
                    {!imgPev ? (
                      <div className="flex flex-col items-center justify-center">
                        <label htmlFor="img" className="w-fit">
                          <CameraIcon className="h-14 p-3 cursor-pointer mx-auto text-red-600 border rounded-full " />
                          <input
                            type="file"
                            name="img"
                            id="img"
                            accept="/image/*"
                            onChange={(e) => imgHandler(e)}
                            hidden
                          />
                        </label>
                        <p className="text-sm my-2 mt-3">Uplode a Photo</p>
                      </div>
                    ) : (
                      <div className="w-full h-[350px] overflow-hidden">
                        <img
                          className="object-cover w-full h-full"
                          src={imgPev}
                        />
                      </div>
                    )}
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Caption Here..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full border rounded-sm p-2 mt-2 focus:outline-red-400"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => uplodeHandler()}
                    >
                      {loading ? "Uploading" : "Uplode"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
