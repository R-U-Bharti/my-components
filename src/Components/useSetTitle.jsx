import React, { useEffect } from 'react'
import { contextVar } from '@/Context/contextVar'

function useSetHeader(route, heading) {

    const { setHeaderText, setHeaderRoute } = React.useContext(contextVar)
    useEffect(() => {
        setHeaderRoute(route)
        setHeaderText(heading)
    }, [])

}

export default useSetHeader