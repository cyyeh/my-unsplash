import {useState} from 'react'

import { 
  ImageContainer,
  Image,
  Button,
  Label
} from './photo.styles'

const Photo = ({ name, url }) => {
  const [hidden, setHidden] = useState(true)

  const handlePhotoOnMouseEnter = (e) => {
    e.preventDefault()
    setHidden(false)
  }

  const handlePhotoOnMouseLeave = (e) => {
    e.preventDefault()
    setHidden(true)
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
        dark={!hidden}
      />
      <Button hidden={hidden}>
        delete
      </Button>
      <Label hidden={hidden}>
        {name}
      </Label>
    </ImageContainer>
  )
}

export default Photo
