import { 
  Image
} from './photo.styles'

const Photo = ({ name, url }) => {
  return (
    <Image 
      src={url}
      alt={name}
      loading='lazy'
    />
  )
}

export default Photo
