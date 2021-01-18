import React, { useRef, useState } from 'react'
import "./SearchBar.css";
import { Fade, Tooltip } from '@material-ui/core';
import { ReactComponent as IconArrow } from './../images/icon-arrow.svg'
import { withStyles } from '@material-ui/styles';


const InputText = React.forwardRef(function MyComponent(props, ref) {
    return <input {...props} ref={ref} />
});

const RedTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: 'red',
        color: 'white',
        fontSize: '12px'

    },
}))(Tooltip);


export default function SearchBar({ onSearch, error }) {

    const inputRef = useRef()
    const [tooltipOpen, setTooltipOpen] = useState(true)

    const handleOnSearch = (e) => {
        e.preventDefault()
        inputRef && inputRef.current !== null && onSearch(inputRef.current.value)
    }


    React.useEffect(() => {
        error && setTooltipOpen(true)
        !error && setTooltipOpen(false)
        let timeoutId = setTimeout(() => {
            setTooltipOpen(false)
        }, 2000);
        return () => clearTimeout(timeoutId)
    }, [error])


    return (
        <form onSubmit={handleOnSearch}>
            <div className="searchBarWrapper">
                <RedTooltip className="searchBarInput" placeholder="Search for any IP address or domain" open={tooltipOpen} TransitionComponent={Fade} ref={inputRef} title={`${error}`}  >
                    <InputText />
                </RedTooltip>
                <button aria-label="Search" className="searchBarButton" type="submit">
                    <IconArrow />
                </button>
            </div>
        </form>
    )


}