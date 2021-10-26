import React from 'react'
import s from './ButtonCustom.module.scss'

export const ButtonCustom = ({ children, ...props }) => {
    return (
        <button className={s.buttonCustom} {...props}>
            {children}
        </button>
    )
}
