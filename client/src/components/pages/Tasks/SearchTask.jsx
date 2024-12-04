import React from 'react'
import "../../../static/css/components/tasks/SearchTask.css"
const SearchTask = () => {
    return (
        <div className="task-search-show">
            <input type="search" placeholder='Поиск...' />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
    )
}
export default SearchTask
