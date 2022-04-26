import {
  GalleryContainer,
  MasonryConainer
} from './gallery.styles'

import Photo from '../photo/photo.component'

import FakePhotos from '../../fakePhotos'

const Gallery = ({ handleDeleteButtonClick }) => {
  return (
    <GalleryContainer>
      <MasonryConainer columns={3} spacing={5.75}>
        {
          FakePhotos.map((photo, index) => (
            <Photo
              key={index}
              name={photo.name}
              url={photo.url}
              handleDeleteButtonClick={handleDeleteButtonClick}
            />
          ))
        }
      </MasonryConainer>
    </GalleryContainer>
  )
}

export default Gallery
