import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import {
  Logo,
  Searcher,
  Icon,
  Button
} from './header.styles'

import MyUnsplashLogo from '../../images/my_unsplash_logo.svg'

const Header = ({ handleAddPhotoButtonClick }) => {
  return (
    <div>
      <Logo src={MyUnsplashLogo} alt="MyUnsplashLogo" />
      <Icon icon={faMagnifyingGlass} />
      <Searcher
        type="text"
        value=""
        placeholder="Search by name"
      />
      <Button onClick={handleAddPhotoButtonClick}>
        <span>Add a photo</span>
      </Button>
    </div>
  )
}

export default Header
