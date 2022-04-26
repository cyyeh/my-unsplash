import { createGlobalStyle } from 'styled-components'
import NotoSans from './fonts/NotoSans-Medium.ttf'
import Montserrat from './fonts/Montserrat-Regular.ttf'

const FontStyles = createGlobalStyle`
@font-face {
  font-family: 'Noto Sans'
  src: url(${NotoSans})
  font-weight: medium
}

@font-face {
  font-family: Montserrat
  src: url(${Montserrat})
  font-weight: normal
}
`

export default FontStyles
