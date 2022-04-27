import {useState, useEffect} from 'react'

import Header from './components/header/header.component'
import Gallery from './components/gallery/gallery.component'
import Dialog from './components/dialog/dialog.component'

import {
  AppContainer
} from './App.styles'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [addPhotoDialogHidden, setAddPhotoDialogHidden] = useState(true)
  const [deletePhotoDialogHidden, setDeletePhotoDialogHidden] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [password, setPassword] = useState('')
  const [candidatePhotoIndex, setCandidatePhotoIndex] = useState(-1)
  const [newPhotoLabel, setNewPhotoLabel] = useState('')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const getPhotos = () => {
    const API_ENDPOINT = (
      process.env.REACT_APP_DEV_MODE === '1' ?
      'http://localhost:9999/.netlify/functions/get-photos' : 
      `${document.location.origin}/.netlify/functions/get-photos`
    )
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(function(data) {
        console.log(data)
        setPhotos(data)
      })
      .catch(function(error) {
        console.error(error)
      })
  }

  useEffect(() => {
    getPhotos()
  }, [])

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
    setNewPhotoLabel('')
    setNewPhotoUrl('')
  }

  const handleDeleteButtonClick = (index) => {
    setDeletePhotoDialogHidden(false)
    setCandidatePhotoIndex(index)
  }

  const handleDeleteOKButtonClick = () => {
    if (password === 'P@ssw0rd') {
      const API_ENDPOINT = (
        process.env.REACT_APP_DEV_MODE === '1' ?
        'http://localhost:9999/.netlify/functions/delete-photo' : 
        `${document.location.origin}/.netlify/functions/delete-photo`
      )
      setLoading(true)

      fetch(API_ENDPOINT, {
        method: 'DELETE',
        body: JSON.stringify({
          'name': photos[candidatePhotoIndex].name
        })
      })
        .then(response => response.json())
        .then(function(data) {
          console.log(data)
          setDeletePhotoDialogHidden(true)
          setLoading(false)
          setPassword('')
          getPhotos()
          setCandidatePhotoIndex(-1)
        })
        .catch(function(error) {
          console.error(error)
          setLoading(false)
        })
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
    const API_ENDPOINT = (
      process.env.REACT_APP_DEV_MODE === '1' ?
      'http://localhost:9999/.netlify/functions/upload-photo' : 
      `${document.location.origin}/.netlify/functions/upload-photo`
    )
    setLoading(true)

    fetch(
      API_ENDPOINT,
      {
        method: 'POST',
        body: JSON.stringify({
          "label": newPhotoLabel,
          "url": newPhotoUrl,
        })
      },
    )
      .then(response => response.json())
      .then(function(data) {
        console.log(data)
        setAddPhotoDialogHidden(true)
        setLoading(false)
        setNewPhotoLabel('')
        setNewPhotoUrl('')
        setPhotos([data].concat(photos))
      })
      .catch(function(error) {
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <AppContainer dark={!addPhotoDialogHidden && !deletePhotoDialogHidden}>
      <Header
        searchValue={searchValue}
        handleAddPhotoButtonClick={handleAddPhotoButtonClick}
        handleSearcherValueChange={handleSearcherValueChange}
      />
      <Gallery
        photos={photos.filter(
          photo => photo.label.indexOf(searchValue) !== -1
        )}
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
        loading={loading}
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
        loading={loading}
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
