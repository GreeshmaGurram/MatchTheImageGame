import {useState, useEffect, useRef} from 'react'
import NavItem from '../NavItem/index'
import ImageItem from '../ImageItem/index'

import './index.css'

const MatchGameHome = ({tabsList, imagesList}) => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [activeTab, setActiveTab] = useState(tabsList[0].tabId)
  const [activeImage, setActiveImage] = useState(imagesList[0])
  const [isMatched, setIsMatched] = useState(true)
  const intervalRef = useRef()

  const decrementTimer = () => {
    setTimeLeft(prevState => prevState - 1)
  }

  useEffect(() => {
    intervalRef.current = setInterval(decrementTimer, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current)
    }
  }, [timeLeft])

  const onThumbNailClicked = image => {
    if (image.id === activeImage.id) {
      const nextActiveImgIndex =
        Math.floor(Math.random() * (imagesList.length - 0 + 1)) + 0
      setScore(ps => ps + 1)
      setIsMatched(true)
      setActiveImage(imagesList[nextActiveImgIndex])
    } else {
      clearInterval(intervalRef.current)
      setIsMatched(false)
    }
  }

  const renderFilteredImages = () => {
    const filteredImageList = imagesList.filter(
      image => image.category === activeTab,
    )
    return (
      <ul className="image-item-container">
        {filteredImageList.map(image => (
          <ImageItem
            key={image.id}
            image={image}
            onThumbNailClicked={onThumbNailClicked}
          />
        ))}
      </ul>
    )
  }

  const onNavButtonClicked = selectedTab => {
    setActiveTab(selectedTab)
  }

  const renderSuccessView = () => (
    <>
      <div className="active-image-container">
        <img className="active-image" src={activeImage.imageUrl} alt="match" />
      </div>
      <div>
        <ul className="nav-items-container">
          {tabsList.map(tab => (
            <NavItem
              key={tab.tabId}
              tab={tab}
              activeTab={activeTab}
              onNavButtonClicked={onNavButtonClicked}
            />
          ))}
        </ul>
      </div>
      <div>{renderFilteredImages()}</div>
    </>
  )

  const playAgainButtonClicked = () => {
    setScore(0)
    setTimeLeft(60)
    setActiveImage(imagesList[0])
    setActiveTab(tabsList[0].tabId)
    setIsMatched(true)
    intervalRef.current = setInterval(decrementTimer, 1000)
  }

  const renderGameOverView = () => (
    <div className="game-over-background-container">
      <img
        className="trophy-style"
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
      />
      <p>YOUR SCORE</p>
      <h1>{score}</h1>
      <button
        type="button"
        onClick={playAgainButtonClicked}
        className="play-again-button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
        />
        PLAY AGAIN
      </button>
    </div>
  )

  const renderView = () =>
    isMatched && timeLeft !== 0 ? renderSuccessView() : renderGameOverView()

  return (
    <div className="background-container">
      <div className="header-container">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
        />
        <ul className="stats-container">
          <li className="stats-container">
            <p>Score: </p>
            <h4 className="stats-text  ml-1">{score}</h4>
          </li>
          <li className="stats-container ml-1">
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p className="stats-text">{timeLeft} sec</p>
          </li>
        </ul>
      </div>
      <div className="active-container">{renderView()}</div>
    </div>
  )
}

export default MatchGameHome
