import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterSearchTask, setSearchValueTask } from '../../../store/searchTaskSlice';

const SearchTask = () => {

    const dispatch = useDispatch();

    const { tasks } = useSelector(state => state.tasks);

    const onChangeHandler = (event) => {
        dispatch(setSearchValueTask(event.target.value))
        dispatch(setFilterSearchTask(tasks.items.filter(task => {
            return task.title.toLowerCase().includes(event.target.value.toLocaleLowerCase())
        })))

    }
    return (
        <div className="task-search-show">
            <input onChange={(e) => onChangeHandler(e)} type="search" placeholder='Поиск...' />
        </div>
    )
}

export default SearchTask