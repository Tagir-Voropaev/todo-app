import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterSearchScript, setSearchValueScript } from '../../../store/scripts/searchScriptSlice';
import { useParams } from 'react-router-dom';

const SearchScript = () => {
    const dispatch = useDispatch();
    const params = useParams('id')
    const { scripts } = useSelector(state => state.scripts);
    const { allscripts } = useSelector(state => state.allscripts);


    const onChangeHandler = (event) => {
        dispatch(setSearchValueScript(event.target.value))
        if (params.id){
            dispatch(setFilterSearchScript(scripts.filter(scripts => {
                return scripts.text.toLowerCase().includes(event.target.value.toLocaleLowerCase())
            })))
        }
        else{
            dispatch(setFilterSearchScript(allscripts.filter(allscripts => {
                return allscripts.text.toLowerCase().includes(event.target.value.toLocaleLowerCase())
            })))
        }

    }
    return (
        
        <div className="script-search-show">
            <input onChange={(e) => onChangeHandler(e)} type="search" placeholder='Поиск...' />
        </div>
    )
}
export default SearchScript