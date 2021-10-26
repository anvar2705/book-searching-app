import React from 'react'
import s from './Preloader.module.css'
import preloaderImage from './preloader.gif'

const Preloader = () => {
    return (
        <div className={s.parent}>
            <img src={preloaderImage} className={s.preloader} />
        </div>
    )
}

export default Preloader
