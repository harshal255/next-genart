import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-violet-500"></div>
            <span className="ml-4 text-pink-500 font-medium">Generating magic...</span>
        </div>
    )
}

Loader.propTypes = {

}

export default Loader
