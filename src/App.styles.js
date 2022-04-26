import styled from 'styled-components'

export const AppContainer = styled.div`
  position: relative;
  height: 100%;
  opacity: ${({ dark }) => (dark ? 0.9 : 1)};
`