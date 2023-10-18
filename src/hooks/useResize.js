import { useState, useEffect } from "react";




export const useResize = () => {
    const [ windowSize, setWindowSize ] = useState(window.innerWidth);
    const [mobileWidths, setMobileWidth ] = useState(['768px', '540px']);
    
    useEffect(() => {
        if (mobileWidths.includes(windowSize)) {
            console.log('New header needed');
        }
        setWindowSize(windowSize);
    },[windowSize])
}