import { createGlobalStyle } from 'styled-components'
import NotoSans from './fonts/NotoSans-Medium.ttf'

const FontStyles = createGlobalStyle`
@font-face {
  font-family: 'Noto Sans'
  src: url(${NotoSans})
  font-weight: medium
}
`

export default FontStyles
