import {useState} from 'react'

import { 
  ImageContainer,
  Image,
  Button,
  Label
} from './photo.styles'

const Photo = ({ name, url, handleDeleteButtonClick }) => {
  const [btnInfoHidden, setBtnInfoHidden] = useState(true)

  const handlePhotoOnMouseEnter = (e) => {
    e.preventDefault()
    setBtnInfoHidden(false)
  }

  const handlePhotoOnMouseLeave = (e) => {
    e.preventDefault()
    setBtnInfoHidden(true)
  }

  return (
    <ImageContainer
      onMouseEnter={handlePhotoOnMouseEnter}
      onMouseLeave={handlePhotoOnMouseLeave}
    >
      <Image 
        src={url}
        alt={name}
        loading='lazy'
        dark={!btnInfoHidden}
      />
      <Button hidden={btnInfoHidden} onClick={handleDeleteButtonClick}>
        delete
      </Button>
      <Label hidden={btnInfoHidden}>
        {name}
      </Label>
    </ImageContainer>
  )
}

export default Photo
