import axios from 'axios';
import 'setimmediate';
import cloudinary from 'cloudinary';

import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: process.env.VUE_APP_CLOUDINARY_NAME,
    api_key: process.env.VUE_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.VUE_APP_CLOUDINARY_API_SECRET
});

describe('Testing upload image', () => {
    test('It must load an image and return the url to delete it', async (done) => {
        const { data } = await axios.get('https://res.cloudinary.com/crscaballero/image/upload/v1659670126/cld-sample-5.jpg', {
            responseType: 'arraybuffer'
        });
        const file = new File([data], 'image.jpg');
        const url = await uploadImage(file);
        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = `${process.env.VUE_APP_CLOUDINARY_PRESET}/${segments[segments.length - 1].replace('.jpg', '')}`;
        await cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
    });
});
