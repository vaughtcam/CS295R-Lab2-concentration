import Status from "./Components/Status";
import Card from "./Components/Card";
import { useState } from 'react';
import './App.css';

const imagePath = 'Cards/';

function fillImages() {
  let images = Array(20).fill(null);
  let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
  let suits = ['h', 's'];
  let index = 0;
  for (let value = 0; value < values.length; value++) {
    for (let suit = 0; suit < suits.length; suit++) {
      images[index] = "card" + values[value] + suits[suit] + ".jpg";
      index++;
    }
  }
  return images;
}

function shuffleImages(images) {
  for (let i = 0; i < images.length; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    [images[i], images[rnd]] = [images[rnd], images[i]];
  }
}


const fillAndShuffle = () => {
  let localImages = fillImages();
  shuffleImages(localImages);
  return localImages;
}



const isMatch = (firstPick, secondPick, images) => {
  if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1))
    return true;
  else
    return false;
}


function App() {

  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);
  const [picks, setPicks] = useState({ first: -1, second: -1 });
  const [images, setImages] = useState(fillAndShuffle);


  this.handleClick = this.handleClick.bind(this);
  this.checkCards = this.checkCards.bind(this);
  this.isMatch = this.isMatch.bind(this);

  const renderCard = (i) => {
    const image = (images[i] === null) ? 'none' :
      ((picks.first === i || picks.second === i) ?
        'url(' + imagePath + images[i] + ')' :
        'url(' + imagePath + 'black_back.jpg)');
    const enabled = (images[i] != null &&
      (i != picks.first && i != picks.second) &&
      (picks.first == -1 || picks.second == -1) &&
      (matches < 10)) ? true : false;
    const eventHandler = (enabled) ? handleClick : () => { };
    const cursor = (enabled) ? "pointer" : "none";
    const style = {
      backgroundImage: image,
      cursor: cursor
    }
    return (
      <div className="card">
        <Card
          index={i}
          eventHandler={eventHandler}
          style={style}
        />
      </div>
    )
  }
  const handleClick = (event) => {
    console.log("Hey! You Clicked!")
    let localPicks = { ...picks };
    setPicks(localPicks);

    let images = [...images];
    const index = parseInt(event.target.id);
    if (picks.first === -1)
      this.setState({ firstPick: index })
    else {
      this.setState({ secondPick: index })
      setTimeout(checkCards, 2000, localPicks.first, localPicks.second, images, tries, matches);
    }
    console.log(event.target.id);
  }

  function checkCards(firstPick, secondPick, images, tries, matches) {
    let result = { ...this.state };
    result.tries++;
    if (isMatch()) {
      result.matches++;
      result.images[result.firstPick] = null;
      result.images[result.secondPick] = null;
    }
    result.firstPick = -1;
    result.secondPick = -1;


      setImages(result.images),
      setPicks(result.firstPick, result.secondPick),
      setMatches(result.matches),
      setTries(result.tries);
  }

  return (
    <div>
      <div className="container" id="board">
        <Status status={status} />
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
          {this.renderCard(8)}
          {this.renderCard(9)}
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(10)}
          {this.renderCard(11)}
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(15)}
          {this.renderCard(16)}
          {this.renderCard(17)}
          {this.renderCard(18)}
          {this.renderCard(19)}
          <div className="col-1"></div>
        </div>
      </div>

    </div>
  )
}


;



export default App;
