import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Logo = styled.img`
  width: 138px;
  height: 26px;
  position: absolute;
  top: 43px;
  left: 99px;
`

export const Searcher = styled.input`
  width: 300px;
  height: 55px;
  position: absolute;
  left: 261px;
  top: 32px;
  
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  border-radius: 12px;

  ::placeholder {
    position: absolute;
    width: 107px;
    height: 19px;
    left: 56.36px;
    top: 18px;
    
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    color: #BDBDBD;    
  }
`

export const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 280.12px;
  top: 50.5px;
  width: 17.05px;
  height: 17.06px;

  color: #BDBDBD;

  z-index: 1;
`

export const Button = styled.button`
  position: absolute;
  width: 137px;
  height: 55px;
  right: 98.13px;
  top: 32px;

  background: #3DB46D;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border: solid #3DB46D;
  border-radius: 12px;

  > span {
    width: 97px;
    height: 22px;
    
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;    

    color: #FFFFFF;
  }
`