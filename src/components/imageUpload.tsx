import { useDropzone } from 'react-dropzone';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase';
function UploadImage() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file: any) => (
        <img src={URL.createObjectURL(file)} alt="Image" style={{ width: '100%', height: '200px' }} />
    ));
    const addImage = async () => {
        if (files.length === 0) {
            alert("Please select a file");
            return
        }
        const imageName = new Date().getTime();
        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, acceptedFiles[0]);
        const url = await getDownloadURL(storageRef);
        console.log("🚀 ~ url:", url)

    }
    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px solid black' }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
            <button onClick={addImage}>Upload</button>
        </section>
    );
}

export default UploadImage