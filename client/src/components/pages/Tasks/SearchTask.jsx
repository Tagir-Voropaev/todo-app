import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterSearch, setSearchValue } from '../../../store/searchSlice';

const SearchTask = () => {

    const dispatch = useDispatch();

    const { searchValue } = useSelector(state => state.search);
    const { tasks } = useSelector(state => state.tasks);

    const onChangeHandler = (event) => {
        dispatch(setSearchValue(event.target.value))
        dispatch(setFilterSearch(tasks.items.filter(task => {
            return task.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
        })))

    }
    return (
        <div className="task-search-show">
            <input onChange={(e) => onChangeHandler(e)} type="search" placeholder='Поиск...' />
        </div>
    )
}

export default SearchTask