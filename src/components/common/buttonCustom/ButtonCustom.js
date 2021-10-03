import React from "react";
import s from './ButtonCustom.module.css'

export const ButtonCustom = ({children, ...props}) => {
    return (
        <button className={s.buttonCustom} {...props}>
            {children}
        </button>
    )
}