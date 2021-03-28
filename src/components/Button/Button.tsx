import React from "react"
import {StyledButton} from "./Button.styled"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean,
  secondary?: boolean,
}

function Button(props: ButtonProps) {
  const {children, ...other} = props

  return (
    <StyledButton {...other}>
      {children}
    </StyledButton>
  )
}

export default Button