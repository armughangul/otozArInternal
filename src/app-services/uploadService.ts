import axiosService from './axios-util/axios-services';

export const uploadImage = async (imageFile: any): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append('file', {
      uri: imageFile.uri,
      name: imageFile.name || 'photo.jpg',
      type: imageFile.type || 'image/jpeg',
    });

    formData.append('module', 'UserImage');

    const response = await axiosService.post('external/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',// 🔒 replace this with your actual token or get it dynamically
      },
    });

    return response.data; // adjust if your API responds differently
  } catch (error: any) {
    console.error('❌ Image upload failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Upload failed');
  }
};

// import axiosService from "./axios-util/axios-services";

// export const uploadImage = async (imageFile: any): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append('image', {
//       file: imageFile.uri,
//       module:'UserImage',
//     //   name: imageFile?.fileName || 'photo.jpg',
//     //   type: imageFile?.type || 'image/jpeg',
//     });

//     const response = await axiosService.post('external/uploads', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data.url; // or response.data depending on your API
//   } catch (error: any) {
//     console.error('Image upload failed:', error);
//     console.log(error.response)
//     throw new Error(error.response?.data?.message || 'Upload failed');
//   }
// };
