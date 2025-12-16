import axios from "axios";

export const uploadeImg = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const imgdata = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return imgdata.data.data.display_url;
};

////save or update user info to database
export const saveOrUpdateUser = async (user) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, user);
  return res.data;
};
