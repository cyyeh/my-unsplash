import {useState, useEffect} from 'react'

import Header from './components/header/header.component'
import Gallery from './components/gallery/gallery.component'
import Dialog from './components/dialog/dialog.component'

import {
  AppContainer
} from './App.styles'

import FakePhotos from './fakePhotos'

const App = () => {
  const [photos, setPhotos] = useState(FakePhotos)
  const [addPhotoDialogHidden, setAddPhotoDialogHidden] = useState(true)
  const [deletePhotoDialogHidden, setDeletePhotoDialogHidden] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [password, setPassword] = useState('')
  const [candidatePhotoIndex, setCandidatePhotoIndex] = useState(-1)
  const [newPhotoLabel, setNewPhotoLabel] = useState('')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')

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

  const handlePhotoLabelInputChange = (e) => {
    setNewPhotoLabel(e.target.value)
  }

  const handlePhotoUrlInputChange = (e) => {
    setNewPhotoUrl(e.target.value)
  }

  const handleSubmitOKButtonClick = () => {
    console.log(process.env.REACT_APP_DEV_MODE)
    const API_ENDPOINT = (
      process.env.REACT_APP_DEV_MODE === '1' ?
      'http://localhost:9999/.netlify/functions/upload-photo' : 
      `${document.location.origin}/.netlify/functions/upload-photo`
    )
    fetch(
      API_ENDPOINT,
      {
        method: 'POST',
        body: JSON.stringify({
          "name": newPhotoLabel,
          "url": newPhotoUrl,
        })
      },
    )
      .then(response => response.json())
      .then(function(data) {
        console.log(data)
      })
      .catch(function(error) {
        console.error(error)
      })
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
            'value': newPhotoLabel,
            'handleInputChange': handlePhotoLabelInputChange,
          },
          {
            'label': 'Photo URL',
            'type': 'url',
            'id': 'photo-url',
            'placeholder': 'https://images.unsplash.com/photo-15843.jpg',
            'value': newPhotoUrl,
            'handleInputChange': handlePhotoUrlInputChange,
          }
        ]}
        actionBtnData={{
          'bgColor': '#3DB46D',
          'text': 'Submit'
        }}
        handleCancelButtonClick={handleCancelButtonClick}
        handleActionButtonClick={handleSubmitOKButtonClick}
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
