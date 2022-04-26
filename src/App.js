import Header from './components/header/header.component'
import Gallery from './components/gallery/gallery.component'

import {
  AppContainer
} from './App.styles'

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Gallery />
    </AppContainer>
  )
}

export default App
