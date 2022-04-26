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
  const [password, setPassword] = useState('')
  const [photos, setPhotos] = useState(FakePhotos)
  const [candidatePhotoIndex, setCandidatePhotoIndex] = useState(-1)

  const handleSearcherValueChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleAddPhotoButtonClick = () => {
    setAddPhotoDialogHidden(false)
  }

  const handleCancelButtonClick = () => {
    setAddPhotoDialogHidden(true)
    setDeletePhotoDialogHidden(true)
    setPassword('')
  }

  const handleDeleteButtonClick = (index) => {
    setDeletePhotoDialogHidden(false)
    setCandidatePhotoIndex(index)
  }

  const handleDeleteOKButtonClick = () => {
    if (password === 'P@ssw0rd') {
      console.log(typeof(candidatePhotoIndex))
      setDeletePhotoDialogHidden(true)
      setPassword('')
      setPhotos(
        photos.splice(candidatePhotoIndex, 1)
      )
      setCandidatePhotoIndex(-1)
    } 
  }

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    if (searchValue) {
      setPhotos(
        photos.filter(
          photo => photo.name.indexOf(searchValue) !== -1
        )
      )
    } else {
      setPhotos(FakePhotos)
    }
  }, [searchValue, photos])

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
            'value': '',
            'handleInputChange': null
          },
          {
            'label': 'Photo URL',
            'type': 'url',
            'id': 'photo-url',
            'placeholder': 'https://images.unsplash.com/photo-15843.jpg',
            'value': '',
            'handleInputChange': null
          }
        ]}
        actionBtnData={{
          'bgColor': '#3DB46D',
          'text': 'Submit'
        }}
        handleCancelButtonClick={handleCancelButtonClick}
        handleActionButtonClick={null}
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
            'value': password,
            'handleInputChange': handlePasswordInputChange,
          }
        ]}
        actionBtnData={{
          'bgColor': '#EB5757',
          'text': 'Delete'
        }}
        handleCancelButtonClick={handleCancelButtonClick}
        handleActionButtonClick={handleDeleteOKButtonClick}
      />
    </AppContainer>
  )
}

export default App
