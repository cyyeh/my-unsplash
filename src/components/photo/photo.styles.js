import styled from 'styled-components'

export const ImageContainer = styled.figure`
  width: 100%;
  display: block;
  position: relative;
`

export const Image = styled.img`
  width: 100%;
  display: block;
  border-radius: ${({ dark }) => (dark ? '24px' : '16px')};

  cursor: pointer;
`

export const Button = styled.button`
  position: absolute;
  width: 63px;
  height: 23px;
  top: 18px;
  right: 18px;

  border: 1px solid #EB5757;
  box-sizing: border-box;
  border-radius: 38px;
  background-color: transparent;
  color: #EB5757;
  cursor: pointer;
`

export const Label = styled.figcaption`
  position: absolute;
  width: 289.53px;
  left: 24.04px;
  bottom: 32.73px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  
  color: #FFFFFF;

  z-index: 1;
`