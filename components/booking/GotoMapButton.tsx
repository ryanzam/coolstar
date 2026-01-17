import React from 'react'
import { Button } from '../ui/button'

const GotoMapButton = ({ location }: any) => {

    const locationObj = JSON.parse(location);

    const handleClick = () => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${27.6881814},${84.432728}&destination=${locationObj.lat},${locationObj.lng}&travelmode=driving`;
        window.open(url, '_blank'); // Opens the map in a new tab
    };

    return (
        <Button variant={"link"} onClick={handleClick} className='cursor-pointer'>Check Location on Map</Button>
    )
}

export default GotoMapButton