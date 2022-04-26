import {useState, useEffect} from 'react'

import Header from './components/header/header.component'
import Gallery from './components/gallery/gallery.component'
import Dialog from './components/dialog/dialog.component'

import {
  AppContainer
} from './App.styles'

import FakePhotos from './fakePhotos'

const App = () => {
  const [addPhotoDialogHidden, setAddPhotoDialogHidden] = useState(true)
  const [deletePhotoDialogHidden, setDeletePhotoDialogHidden] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [photos, setPhotos] = useState(FakePhotos)

  const handleSearcherValueChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleAddPhotoButtonClick = () => {
    setAddPhotoDialogHidden(false)
  }

  const handleCancelButtonClick = () => {
    setAddPhotoDialogHidden(true)
    setDeletePhotoDialogHidden(true)
  }

  const handleDeleteButtonClick = () => {
    setDeletePhotoDialogHidden(false)
  }

  useEffect(() => {
    if (searchValue) {
      setPhotos(
        FakePhotos.filter(
          photo => photo.name.indexOf(searchValue) !== -1
        )
      )
    } else {
      setPhotos(FakePhotos)
    }
  }, [searchValue])

  return (
    <AppContainer dark={!addPhotoDialogHidden && !deletePhotoDialogHidden}>
      <Header
        searchValue={searchValue}
        handleAddPhotoButtonClick={handleAddPhotoButtonClick}
        handleSearcherValueChange={handleSearcherValueChange}
      />
      <Gallery
        photos={photos}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
      <Dialog 
        hidden={addPhotoDialogHidden}
        title='Add a new photo'
        height={367.2}
        inputs={[
          {
            'label': 'Label',
            'type': 'text',
            'id': 'label',
            'placeholder': 'Suspendisse elit massa',
            'value': ''
          },
          {
            'label': 'Photo URL',
            'type': 'url',
            'id': 'photo-url',
            'placeholder': 'https://images.unsplash.com/photo-15843.jpg',
            'value': ''
          }
        ]}
        actionBtnData={{
          'bgColor': '#3DB46D',
          'text': 'Submit'
        }}
        handleCancelButtonClick={handleCancelButtonClick}
      />
      <Dialog
        hidden={deletePhotoDialogHidden}
        title='Are you sure?'
        height={276.12}
        inputs={[
          {
            'label': 'Password',
            'type': 'password',
            'id': 'password',
            'placeholder': '***************',
            'value': ''
          }
        ]}
        actionBtnData={{
          'bgColor': '#EB5757',
          'text': 'Delete'
        }}
        handleCancelButtonClick={handleCancelButtonClick}
      />
    </AppContainer>
  )
}

export default App
