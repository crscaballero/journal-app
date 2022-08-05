import axios from "axios";

const uploadImage = async (file) => {
    if (!file) return;
    try {
        const formData = new FormData();
        formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
        formData.append('file', file);
        const cloudinaryUrl = process.env.VUE_APP_CLOUDINARY_URL;
        const { data } = await axios.post(cloudinaryUrl, formData);
        console.log('uploadImage:data:', data);
        return data.secure_url;
    } catch (error) {
        console.log('uploadImage:error:', error);
    }
}

export default uploadImage;
