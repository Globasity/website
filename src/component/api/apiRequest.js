import axios from 'axios'


const API_URL = 'https://globasity.com/api/api.php/'
export const body = new FormData()
export const apiRequest = async ({ body }) => {
  // ** Store Vars
  return await axios
    .post(API_URL, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}
export const apiRequestEmail = async ({ body }) => {
  // ** Store Vars
  return await axios
    .post('https://locatestudent.com/globasity/api.php', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

export const apiRequestFile = async (file) => {
  const formData = new FormData();
  formData.append('type', 'upload_data')
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
export const apiRequestBase64File = async (file) => {
  const formData = new FormData();
  formData.append('type', 'upload_data_base64')
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};