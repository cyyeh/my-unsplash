import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import {
  Logo,
  Searcher,
  Icon,
  Button
} from './header.styles'

import MyUnsplashLogo from '../../images/my_unsplash_logo.svg'

const Header = ({ 
  searchValue,
  handleAddPhotoButtonClick,
  handleSearcherValueChange
}) => {
  return (
    <div>
      <Logo src={MyUnsplashLogo} alt="MyUnsplashLogo" />
      <Icon icon={faMagnifyingGlass} />
      <Searcher
        type="text"
        value={searchValue}
        placeholder="Search by name"
        onChange={handleSearcherValueChange}
      />
      <Button onClick={handleAddPhotoButtonClick}>
        <span>Add a photo</span>
      </Button>
    </div>
  )
}

export default Header
