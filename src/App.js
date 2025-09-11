import logo from "./logo.svg";
import "./App.css";
import Accordion from "./components/accordion";
import RandomColor from "./components/random color generator";
import StarRating from "./components/star-rating";
import ImageSlider from "./components/image-slider";

function App() {
  return (
    <div className="App">
      {/* <Accordion></Accordion>

      <RandomColor></RandomColor>

      <StarRating noOfStars={10} /> */}

      <ImageSlider
        url={"https://api.thecatapi.com/v1/images/search"}
        limit={"10"}
      />
    </div>
  );
}

export default App;
