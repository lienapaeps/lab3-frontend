export const uploadToCloudinary = async (uri) => {
    try {
        // upload naar Cloudinary
        let filename = uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            name: filename,
            type: type,
        });

        formData.append('upload_preset', 'plant-en-pluk'); 
        formData.append('cloud_name', 'dnzh1re3f'); 

        const response = await fetch('https://api.cloudinary.com/v1_1/dnzh1re3f/image/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if(data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error('Er is een fout opgetreden bij het uploaden van de afbeelding');
        }
    } catch (error) {
        console.error('Fout bij het uploaden naar Cloudinary:', error);
        throw error; // Door de fout door te geven, kan de component ermee omgaan indien nodig
    }
};