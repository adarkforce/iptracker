import { CircularProgress } from '@material-ui/core'
import React from 'react'

export default function Loader({ ...props }) {
    return (
        <CircularProgress style={{ color: 'black' }} />
    )
}