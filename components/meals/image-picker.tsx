'use client';
import classes from "./image-picker.module.css";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
const ImagePicker = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [ imagePicked, setImagePicked ] = useState<string | StaticImport | null>(null);

  const onButtonClickHandler = () => {
    if(imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  const onImageChangedHandler = (event: ChangeEvent<HTMLInputElement> ) => {
    if(event.target.files && event.target.files[0] instanceof Blob) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePicked(fileReader.result as string)
      };

      fileReader.readAsDataURL(file);
    } else {
      setImagePicked(null);
    }
  }

  // @ts-ignore
  return (
    <>
      <div className={classes.picker}>
        <div className={classes.controls}>
          <div className={classes.preview}>
            {!imagePicked ?
              <p>No image picked yet</p> :
              <Image src={imagePicked} alt="The image selected by the user" fill/>
            }
          </div>
          <input
            className={classes.input}
            type="file"
            id="image-picked"
            name="image-picked"
            accept="image/jpeg, image/png"
            ref={imageInputRef}
            onChange={onImageChangedHandler}
            required
          />
          <button
            className={classes.button}
            type="button"
            onClick={onButtonClickHandler}
          >
            Provide an Image
          </button>
        </div>
      </div>
    </>
  )
}

export default ImagePicker