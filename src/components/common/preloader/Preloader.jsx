import React from "react";
import preloaderImage from "./preloader.gif";
import s from "./Preloader.module.css"

const Preloader = (props) => {
    return (
        <div className={s.parent}>
            <img src={preloaderImage} className={s.preloader}/>
        </div>
    )
}

export default Preloader