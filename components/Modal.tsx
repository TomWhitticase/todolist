import { Box, Dialog } from "@mui/material";
import { SetStateAction, useState } from "react";
import { MdPadding } from "react-icons/md";

interface IProps {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  children: JSX.Element;
}

export default function Modal({ setOpen, open, children }: IProps) {
  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <Box sx={{ p: 2, display: "flex", gap: 2, flexDirection: "column" }}>
          {children}
        </Box>
      </Dialog>
    </>
  );
}
