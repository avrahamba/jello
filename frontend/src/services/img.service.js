const CLOUD_NAME = 'dy31deyp1';
const UPLOAD_PRESET = 'g1gyj9ce';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


const uploadImg = async (ev) => {
    const formData = new FormData();
    formData.append('file', ev.file)
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const imgService = {
    uploadImg
}