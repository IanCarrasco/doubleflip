import React, {useRef, useState, useEffect} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ImageUploader from "react-images-upload";
import Home from './Home.js'
import './App.css'

const doubleFlip = (im, mode) => {
  let canvas = new OffscreenCanvas(im.width, im.height);
  let canvasContext = canvas.getContext('2d')
  switch(mode){
    case 0:
      canvasContext.drawImage(im, 0, 0, im.width/2, im.height, 0, 0, im.width/2, im.height);
      canvasContext.setTransform(-1,0,0,1,canvas.width,0);
      canvasContext.drawImage(im, 0, 0, im.width/2, im.height, 0, 0, im.width/2, im.height);
      break;
    case 1:
      canvasContext.setTransform(1,0,0,1,canvas.width/2,0);
      canvasContext.drawImage(im, im.width/2, 0, im.width/2, im.height, 0, 0, im.width/2, im.height);
      canvasContext.setTransform(-1,0,0,1,im.width/2,0);
      canvasContext.drawImage(im, im.width/2, 0, im.width/2, im.height, 0, 0, im.width/2, im.height);
      break;
    case 2:
      canvasContext.drawImage(im, 0, 0, im.width, im.height);
      break;
  }
  return canvas.convertToBlob()
}




const App = props => {
  
  const imgRefM1 = useRef(null)
  const imgRefM2 = useRef(null)
  const imgRefOrig = useRef(null)

  const [pictures, setPictures] = useState([]);
  const [downloadHidden, setDlHidden] = useState(true);

  const download = ref => {window.open(ref.current.currentSrc)}



  const onDrop = picture => {

    setPictures([])
    setPictures([...pictures, picture]);

    let containerM1 = imgRefM1.current
    let containerM2 = imgRefM2.current
    let containerOrig = imgRefOrig.current

    let img = new Image();
    img.src = URL.createObjectURL(picture[picture.length - 1])
    img.onload = () => {
      let promises = [doubleFlip(img, 0), doubleFlip(img, 1), doubleFlip(img, 2)]
      Promise.all(promises).then((b) => {
        containerM1.src = URL.createObjectURL(b[0]);
        containerM2.src = URL.createObjectURL(b[1]);
        containerOrig.src = URL.createObjectURL(b[2]);
        setDlHidden(false)
      })
    }
    console.log(imgRefM1);
  };

  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/display">
        <div className="App">
          <div className="gallery">
            <div>
              <img ref={imgRefM1} className="image-container"></img>
              { !downloadHidden &&
                <button onClick={() => download(imgRefM1)}>Download Image</button>
              }
            </div>
            <div>
              <img ref={imgRefOrig} className="image-container"></img>
            </div>
            <div>
              <img ref={imgRefM2} className="image-container"></img>
              { !downloadHidden &&
                <button onClick={() => download(imgRefM2)}>Download Image</button>
              }
            </div>
          </div>
          <ImageUploader
              {...props}
              withIcon={true}
              onChange={onDrop}
              label="Select an Image to DoubleFlip"
              buttonText="Open"
              imgExtension={[".jpg",".jpeg",".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              className="upload-box"
            />
        </div>
      </Route>
    </Switch>
    </Router>
  );
};

export default App;