import "./ScrollPhotos.css";

import {
  default as myImage5,
  default as myImage6,
} from "../../../img/Main-photo5.png";

import myImage1 from "../../../img/Main-photo1.png";
import myImage2 from "../../../img/Main-photo2.png";
import myImage3 from "../../../img/Main-photo3.png";
import myImage4 from "../../../img/Main-photo4.png";

const images = {
  myImage1,
  myImage2,
  myImage3,
  myImage4,
  myImage5,
  myImage6,
};

export default function ScrollPhotos() {
  return (
    <div className="scroll-photo">
      <div className="scroll-photo-block1">
        {Object.values(images).map(
          (imgSrc, index) =>
            index % 2 !== 0 && (
              <img
                key={index}
                src={imgSrc}
                alt={`Image ${index + 1}`}
                className={`main-img ${index + 1} , main-img`}
              />
            )
        )}
        {Object.values(images).map(
          (imgSrc, index) =>
            index % 2 !== 0 && (
              <img
                key={index}
                src={imgSrc}
                alt={`Image ${index + 1}`}
                className={`main-img ${index + 1}`}
              />
            )
        )}
      </div>

      <div className="scroll-photo-block2">
        {Object.values(images).map(
          (imgSrc, index) =>
            index % 2 === 0 && (
              <img
                key={index}
                src={imgSrc}
                alt={`Image ${index + 1}`}
                className={`main-img ${index + 1}`}
              />
            )
        )}
        {Object.values(images).map(
          (imgSrc, index) =>
            index % 2 === 0 && (
              <img
                key={index}
                src={imgSrc}
                alt={`Image ${index + 1}`}
                className={`main-img ${index + 1}`}
              />
            )
        )}
      </div>
    </div>
  );
}
