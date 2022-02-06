import React from 'react';
import { Typography } from '@mui/material'


export default function CopyRight(){
  return (
    <Typography variant='body2' color="textSecondary" align="center">
      {"Copyright © "}
      fsoftwareengineer, {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}