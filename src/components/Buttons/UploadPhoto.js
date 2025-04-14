// import React, { useState } from 'react';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { Flex, message, Upload } from 'antd';
// import { API_URL, fetchRequest } from "../../service/FetchRequest";

// const UploadPhoto = ({ setAvatar }) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState(null);

//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//       return false; // Додано return false для блокування завантаження
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must be smaller than 2MB!');
//       return false; // Додано return false для блокування завантаження
//     }
//     return isJpgOrPng && isLt2M;
//   };

//   const changeAvatar = async ({ file, onSuccess, onError }) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("avatar", file); // Виправлено ім'я поля на "avatar" (має відповідати бекенду)
    
//     try {
//       const response = await fetchRequest.put(`${API_URL}/api/users/avatar`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data' // Додано правильний заголовок
//         }
//       });

//       if (response.status === 200) {
//         const uploadedUrl = response.data.avatarUrl; // Припустимо, що бекенд повертає URL
//         setImageUrl(uploadedUrl);
//         setAvatar(uploadedUrl); // Оновлюємо avatar в батьківському компоненті
//         message.success("Avatar updated successfully!");
//         onSuccess(uploadedUrl); // Передаємо URL у onSuccess
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       message.error("Upload failed. " + (error.response?.data?.message || ""));
//       onError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadButton = (
//     <button className='change-profile-img' style={{ border: 0, background: 'none' }} type="button">
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ color: "white" }}>+</div>
//     </button>
//   );

//   return (
//     <Flex gap="middle" wrap>
//       <Upload
//         name="avatar"
//         listType="picture-circle"
//         className="avatar-uploader"
//         showUploadList={false}
//         customRequest={changeAvatar}
//         beforeUpload={beforeUpload}
//         accept="image/jpeg,image/png" // Додано accept для фільтрації файлів
//       >
//         {imageUrl ? (
//           <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} />
//         ) : (
//           uploadButton
//         )}
//       </Upload>
//     </Flex>
//   );
// };

// export default UploadPhoto;

// import React, { useState } from 'react';
// import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
// import { message, Upload } from 'antd';
// import axios from 'axios';
// import { API_URL  , fetchRequest} from '../../service/FetchRequest';

// const UploadPhoto = ({ setAvatar, avatar }) => {
//   const [loading, setLoading] = useState(false);

//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must be smaller than 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
//   };

//   const changeAvatar = async ({ file, onSuccess, onError }) => {
//     setLoading(true);
//     // const formData = new FormData();
//     // formData.append("avatar_url", file);
//     const form = {
//         avatar_url: file
//     }

//     try {
//       const response = await fetchRequest.put(`${API_URL}/api/users/avatar`, form);
      

//       if (response.status === 200) {
//         const uploadedUrl = response.data.avatar_url; // Припускаємо, що бекенд повертає URL
//         setAvatar(uploadedUrl);
//         message.success("Avatar updated successfully!");
//         onSuccess();
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       message.error("Upload failed.");
//       onError();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Upload
//       name="avatar_url"
//       showUploadList={false}
//       customRequest={changeAvatar}
//       beforeUpload={beforeUpload}
//     >
//       <div style={{
//         position: "relative",
//         width: "150px",
//         height: "150px",
//         borderRadius: "50%",
//         overflow: "hidden",
//         cursor: "pointer",
//         border: "2px solid #ddd"
//       }}>
//         <img
//           src={avatar}
//           alt="avatar"
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//         <div style={{
//           position: "absolute",
//           bottom: 0,
//           width: "100%",
//           background: "rgba(0, 0, 0, 0.5)",
//           color: "white",
//           textAlign: "center",
//           padding: "5px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         }}>
//           {loading ? <LoadingOutlined /> : <CameraOutlined />}
//         </div>
//       </div>
//     </Upload>
//   );
// };

// export default UploadPhoto;
