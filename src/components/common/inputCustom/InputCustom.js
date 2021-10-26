import React, { forwardRef } from 'react'
import s from './InputCustom.module.scss'

export const InputCustom = forwardRef(({ children, ...props }, ref) => {
    return (
        <div className={s.root}>
            <input ref={ref} className={s.input} placeholder=" " {...props} />
            <label className={s.label}>{children}</label>
        </div>
    )
})
