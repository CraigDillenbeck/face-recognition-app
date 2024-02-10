import { useState } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Signin from './components/Signin/Signin';
// import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import Register from './components/Register/Register';

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setImageUrl('');
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route);
  }

  const returnClarifaiRequestOptions = (imageUrl) => {
    // CLARIFAI
    const PAT = '2ca102d212a94b93b589e302dc00c670';
    const USER_ID = 'craigdillenbeck';
    const APP_ID = 'facial-recognition';
    // const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                      // "base64": IMAGE_BYTES_STRING
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    return requestOptions;
  }

  const onPictureSubmit = () => {
    setImageUrl(input);

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(input))
        .then(response => response.json())
        .then(result => {
          if (result) {
            fetch('https://i-see-your-face-backend.onrender.com/image', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                setUser({
                  ...user,
                  entries: count
                });
              })
              .catch(console.log)
          }

            const image = document.getElementById('input-image');
            const width = Number(image.width);
            const height = Number(image.height);

            // CLARIFAI
            const regions = result.outputs[0].data.regions;

            regions.forEach(region => {
                // Accessing and rounding the bounding box values
                const boundingBox = region.region_info.bounding_box;
                const topRow = boundingBox.top_row.toFixed(3);
                const leftCol = boundingBox.left_col.toFixed(3);
                const bottomRow = boundingBox.bottom_row.toFixed(3);
                const rightCol = boundingBox.right_col.toFixed(3);

                region.data.concepts.forEach(concept => {
                    // Accessing and rounding the concept value
                    const name = concept.name;
                    const value = concept.value.toFixed(4);

                    console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

                    // parameters to display box
                    const boxLeft = leftCol * width;
                    const boxTop = topRow * height;
                    const boxRight = width - (rightCol * width);
                    const boxBottom = height - (bottomRow * height);

                    setBox({
                      left: boxLeft,
                      top: boxTop,
                      right: boxRight,
                      bottom: boxBottom
                    })
                });
            });

        })
        .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <ParticlesBg color='#5e789b' type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home'
        ? <div>
            {/* <Logo /> */}
            <Rank userName={user.name} userEntries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
            route === 'signin'
            ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
            : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          )
      }
    </div>
  );
}

export default App;
