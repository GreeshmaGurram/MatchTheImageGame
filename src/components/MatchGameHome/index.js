import {Component} from 'react'
import NavItem from '../NavItem/index'
import ImageItem from '../ImageItem/index'

import './index.css'

export default class MatchGameHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      timeLeft: 60,
      activeTab: props.tabsList[0].tabId,
      activeImage: props.imagesList[0],
      isMatched: true,
    }
  }

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  setTimer = () => {
    this.intervalId = setInterval(this.decrementTimer, 1000)
  }

  renderFilteredImages = () => {
    const {imagesList} = this.props
    const {activeTab} = this.state
    const filteredImageList = imagesList.filter(
      image => image.category === activeTab,
    )
    return (
      <ul className="image-item-container">
        {filteredImageList.map(image => (
          <ImageItem
            key={image.id}
            image={image}
            onThumbNailClicked={this.onThumbNailClicked}
          />
        ))}
      </ul>
    )
  }

  decrementTimer = () => {
    this.setState(prevState => ({timeLeft: prevState.timeLeft - 1}))
  }

  onThumbNailClicked = image => {
    const {activeImage} = this.state
    const {imagesList} = this.props

    if (image.id === activeImage.id) {
      const nextActiveImgIndex =
        Math.floor(Math.random() * (imagesList.length - 0 + 1)) + 0
      this.setState(prevState => ({
        score: prevState.score + 1,
        isMatched: true,
        activeImage: imagesList[nextActiveImgIndex],
      }))
    } else {
      clearInterval(this.intervalId)
      this.setState({
        isMatched: false,
      })
    }
  }

  onNavButtonClicked = activeTab => {
    this.setState({activeTab})
  }

  clearTimer = () => {
    const {timeLeft} = this.state

    if (timeLeft === 0) {
      clearInterval(this.intervalId)
    }
  }

  renderView = () => {
    const {isMatched, timeLeft} = this.state
    return isMatched && timeLeft !== 0
      ? this.renderSuccessView()
      : this.renderGameOverView()
  }

  renderSuccessView = () => {
    const {tabsList} = this.props
    const {activeImage, activeTab} = this.state

    return (
      <>
        <div className="active-image-container">
          <img
            className="active-image"
            src={activeImage.imageUrl}
            alt="match"
          />
        </div>
        <div>
          <ul className="nav-items-container">
            {tabsList.map(tab => (
              <NavItem
                key={tab.tabId}
                tab={tab}
                activeTab={activeTab}
                onNavButtonClicked={this.onNavButtonClicked}
              />
            ))}
          </ul>
        </div>
        <div>{this.renderFilteredImages()}</div>
      </>
    )
  }

  playAgainButtonClicked = () => {
    const {tabsList, imagesList} = this.props
    this.setState(
      {
        score: 0,
        timeLeft: 60,
        activeTab: tabsList[0].tabId,
        activeImage: imagesList[0],
        isMatched: true,
      },
      this.setTimer,
    )
  }

  renderGameOverView = () => {
    this.clearTimer()
    const {score} = this.state
    return (
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
          onClick={this.playAgainButtonClicked}
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
  }

  render() {
    const {score, timeLeft} = this.state
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
        <div className="active-container">{this.renderView()}</div>
      </div>
    )
  }
}
