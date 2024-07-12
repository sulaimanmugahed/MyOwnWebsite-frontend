import { getDownloadURL, ref, uploadBytes, deleteObject, getBlob } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "./firebase";

export const decodeSearchParams = (searchParams: URLSearchParams) => {
    return [...searchParams.entries()].reduce((acc, [key, val]) => {
        try {
            return {
                ...acc,
                [key]: JSON.parse(val)
            };
        } catch {
            return {
                ...acc,
                [key]: val
            };
        }
    }, {});
};



export const uploadToFireStorage = async (file: File, folderName: string) => {

    const fileRef = ref(storage, `${folderName}/${file.name + v4()}`);
    const result = await uploadBytes(fileRef, file);


    const url = await getDownloadURL(result.ref);

    return { url, fullPath: fileRef.fullPath };

};

export const getImageBlob = async (imagePath: string) => {
    const storageRef = ref(storage, imagePath)
    const blob = await getBlob(storageRef)
    return blob
};

export const multiUploadToFireStorage = async (files: File[], folderName: string) => {
    if (files.length < 1) return []

    const filePromises = files?.map(file => uploadToFireStorage(file, folderName));
    const filesRes = await Promise.all(filePromises!);
    return filesRes;


}

export const removeFileFromFireStorage = async (fileFullPath: string) => {
    const fileRef = ref(storage, fileFullPath);
    await deleteObject(fileRef)
}

export const removeFilesFromFireStorage = async (filesFullPath: string[]) => {
    await Promise.all(filesFullPath.map(filePath => removeFileFromFireStorage(filePath)))
}