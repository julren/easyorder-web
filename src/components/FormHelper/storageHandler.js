import { storage } from "../../config/firebase";
import ImageCompressor from "image-compressor.js";

export default {
  /**
   * Upload a Image to Firebase Storage
   * @constructor
   * @param {file} file - File to upload
   * @param {string} fileName - Name for uploaded Image
   */
  uploadImage: async ({ file, fileName }) => {
    if (!file) return;

    try {
      const compressedImage = await compressImage(file);
      const downloadURL = await uploadImageToStorage(compressedImage, fileName);
      return downloadURL;
    } catch (error) {
      console.error(error);
    }
  },

  delteImageFromStorage: downloadURL => {
    const fileRef = storage.refFromURL(downloadURL);
    fileRef
      .delete()
      .then()
      .catch(error => {
        console.log(error);
      });
    return;
  }
};

const compressImage = async file => {
  if (!file) throw Error("No file supplied");
  return new Promise(resolve => {
    new ImageCompressor(file, {
      quality: 0.6,
      maxWidth: 600,
      success(result) {
        resolve(result);
      },
      error(e) {
        console.log(e.message);
      }
    });
  });
};

const uploadImageToStorage = async (file, fileName) => {
  const fileExtension = file.name.replace(/(.*)\.(.*?)$/, "$2");
  const uploadFileName = fileName + "." + fileExtension;
  const storagePath = "public/images/" + uploadFileName;

  return new Promise(resolve => {
    storage
      .ref()
      .child(storagePath)
      .put(file)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("Uploaded File available at", downloadURL);

          resolve(downloadURL);
        });
      });
  });
};
