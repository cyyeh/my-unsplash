import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import styled from 'styled-components'

export const DialogContainer = styled(Dialog)`
  position: absolute !important;
  width: 620px !important;
  height: ${({ height }) => `${height}px !important`};
  left: 424.36px !important;
  top: 250.64px !important;

  background: #FFFFFF !important;
  border-radius: 12px;

  .MuiDialog-container {
    height: auto !important;
  }

  .MuiPaper-root {
    width: 620px !important;
    height: ${({ height }) => `${height}px !important`};
    background: #FFFFFF !important;
    margin: 0px !important;
    max-width: 620px !important;
    border-radius: 12px;
  }
`

export const DialogContentTitle = styled(DialogTitle)`
  position: absolute !important;
  width: 195px !important;
  height: 33px !important;
  top: 24px !important;
  left: 32px !important;
  margin: 0px !important;
  padding: 0px !important;

  font-family: 'Noto Sans' !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 24px !important;
  line-height: 33px !important;

  color: #333333 !important;
`

export const DialogContentContainer = styled(DialogContent)`
  padding: 0px !important;
`

export const InputContainer = styled.div`
  position: absolute;
  left: 32.05px;
  top: 77.91px;
  right: 35.62px;
`

export const Label = styled.div`
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;    

  color: #4F4F4F;

  margin-bottom: 9.97px;
`

export const Input = styled.input`
  width: 552.33px;
  height: 55px;
  border: 1px solid #4F4F4F;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  border-radius: 12px;

  margin-bottom: 18.55px;
  text-indent: 18px;

  ::placeholder {
    position: relative;
    left: 18px;
    text-indent: 0px;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    color: #BDBDBD;
  }
`

export const DialogActionsContainer = styled(DialogActions)`
  position: absolute !important;
  right: 35.62px !important;
  bottom: 23.8px !important;
  padding: 0px !important;
`

export const CancelButton = styled.button`
  width: 51px;
  height: 22px;

  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  color: #BDBDBD;
  border: none;
  background: none;
  padding: 0px;

  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`

export const ActionButton = styled.button`
  width: 105px;
  height: 55px;

  background: ${({ btnColor }) => btnColor};
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid ${({ btnColor }) => btnColor};

  margin-left: 24.74px !important;

  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  
  color: #FFFFFF;

  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`