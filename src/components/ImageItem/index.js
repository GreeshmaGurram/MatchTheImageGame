import {Component} from 'react'
import './index.css'

export default class ImageItem extends Component {
  render() {
    const {image, onThumbNailClicked} = this.props
    const onImageClicked = () => {
      onThumbNailClicked(image)
    }
    return (
      <li className="img-container" onClick={onImageClicked}>
        <img className="img-style" src={image.thumbnailUrl} alt="thumbnail" />
      </li>
    )
  }
}
