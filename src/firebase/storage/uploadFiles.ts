// import { auth } from "../config";
// import { signOut } from "firebase/auth";

// export default async function logOut(): Promise<void> {
//     try {
//         await signOut (auth);
//     } catch (e) {
//         console.error(e);
//     }
// }

import { storage } from "../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// interface FileUploadResult {
//     downloadURL: string
// }

export default async function fileUpload(file: File, parentPath: string): Promise<string> {

    return new Promise((resolve, reject) => {
        // Create the file metadata
        /** @type {any} */
        const metadata = {
        contentType: file.type
        };
    
        const fileName = file.name.replace(/\s/g, '')

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, `${parentPath}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;
    
            // ...
    
            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            reject(error)
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
                resolve(downloadURL)
                console.log('File available at', downloadURL);
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        }
        );

    })

}