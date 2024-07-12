import { Box } from "@mui/material"
import { ReactNode } from "react"

interface IProps {
  children: ReactNode
}
export default function MainContainer({ children }: IProps) {
  return (
    <Box>
      {children}
    </Box>
  )
}