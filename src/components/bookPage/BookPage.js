import React, {useEffect} from 'react';
import s from './BookPage.module.scss';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getBookDataThunk} from "../../redux/bookPage-reducer";

const BookPage = (props) => {
    let id = props.match.params.id

    useEffect(() => {
        props.getBookDataThunk(id)
        console.log('useEffect')
    }, [])

    return (
        <div className={s.bookPage}>

        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        bookData: state.bookPage.bookData
    }
}
let mapDispatchToProps = {
    getBookDataThunk
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(BookPage)