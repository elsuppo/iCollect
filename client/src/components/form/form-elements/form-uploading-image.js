import React from 'react';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../utils/firebase';

const FormUploadingImage = ({ selectedImg, setSelectedImg, setImageUrl, toast }) => {

  useEffect(() => {
    uploadImg(selectedImg);
    // eslint-disable-next-line
  }, [selectedImg])

  const uploadImg = (img) => {
    if (!img) return;
    const imageRef = ref(storage, `images/collections/${v4()}${img.name}`);
    const uploadTask = uploadBytesResumable(imageRef, img);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(`File uploaded on ${progress} %`);
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => setImageUrl(url));
      })
  }

  return (
    <TextField
      type="file"
      onChange={(e) => {
        if (e.target.files[0].type.slice(0, 5) !== 'image') {
          setSelectedImg('');
          toast.error('You need to upload a file of the image type', { position: 'top-right' });
        } else {
          setSelectedImg(e.target.files[0]);
        }
      }}
      sx={{
        "& .MuiInputBase-root": {
          height: 160,
        },
        "& .MuiInputBase-input": {
          height: "100%",
          width: 336,
          padding: 0,
          background: "#F9F9F9",
          border: "1px dashed #585E67",
          borderRadius: "8px",
          cursor: "pointer",
          "&::file-selector-button": {
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            background: "#F9F9F9",
            border: "none"
          },
        },
        "& .MuiInputBase-input:hover": {
          border: "1px solid #000000",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          padding: 0,
        }
      }}
    />
  )
}

export default FormUploadingImage;