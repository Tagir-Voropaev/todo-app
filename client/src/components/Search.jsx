import React from 'react'
import s from '../static/css/header/search.module.scss'
const Search = ({text}) => {
  return (
    <div className={s.search}>
        <input className={s.searchInput} type="search" placeholder={text + "..."} />
        <button className={s.searchButton}><i className="fa-solid fa-magnifying-glass"></i></button>
    </div>
  )
}

export default Search