import {
  DialogContainer,
  DialogContentTitle,
  DialogContentContainer,
  InputContainer,
  Label,
  Input,
  DialogActionsContainer,
  CancelButton,
  ActionButton,
} from './dialog.styles'

const Dialog = (
  {
    hidden, 
    title,
    height,
    inputs,
    loading,
    actionBtnData, 
    handleCancelButtonClick,
    handleActionButtonClick,
  }
) => {
  return (
    <DialogContainer open={!hidden} height={height}>
      <DialogContentTitle>{title}</DialogContentTitle>
      <DialogContentContainer>
        <InputContainer>
          {inputs.map((input, index) => (
            <div key={index}>
              <Label>{input.label}</Label>
              <Input 
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                onChange={input.handleInputChange}
              />
            </div>
          ))}
        </InputContainer>
      </DialogContentContainer>
      <DialogActionsContainer>
        <CancelButton
          onClick={handleCancelButtonClick}
          disabled={loading}
        >
          Cancel
        </CancelButton>
        <ActionButton
          btnColor={actionBtnData.bgColor}
          onClick={handleActionButtonClick}
          disabled={loading}
        >
          {actionBtnData.text}
        </ActionButton>
      </DialogActionsContainer>
    </DialogContainer>
  )
}

export default Dialog
