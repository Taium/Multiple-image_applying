import React, { useState } from 'react';
import ImageUploading from "react-images-uploading";


const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList);
        setImages(imageList);
    };
    var imagesLength = images.length
    const handleCreatePost = (e) => {
        const formData = new FormData()
        formData.append('usernumber', "+8801521553889")
        formData.append('caption', "screenshot")
        // formData.append('images[]',img)
        for(var a = 0; a<imagesLength; ++a){
            formData.append('images[]', images[a].file)
        }
       
        // images.forEach((image_file,index) => {
        //     formData.append('images[]', image_file[index].file);
        // });
      
       
        fetch('http://sellinbd.com/lexdiary/post/createPost.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            window.location.reload()
            e.preventDefault();
          })
          .catch(error => {
            console.error(error)
          })
      }
    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={5}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
            </button>
            &nbsp;
                            <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </ImageUploading>
            <btn onClick={handleCreatePost}>click</btn>
        </div>
    );
};

export default ImageUpload;