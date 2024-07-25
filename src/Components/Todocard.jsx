import "./Todocard.css"
import propTypes from "prop-types"
import { useState, useEffect } from "react";


const Todocard = ({ id, name, description, st, deleteTodo, editTodo, updateStatus }) => {

    const [stat, setStatus] = useState(st);

    const handleChange = (e) => {
        updateStatus(e.target.value, id);
    }

    useEffect(() => {
        setStatus(st);
    }, [st]);

    const handleDelete = () => {
        deleteTodo(id);
    }

    const handleEdit = () => {
        editTodo({ id, name, description });
    }

    return (<div className="todocard">
        {console.log(stat)}
        <p>Name : {name} </p>
        <p>Description : {description} </p>
        <label htmlFor="status">Status </label>
        <select style={{ backgroundColor: stat == "notcompleted" ? "orangered" : "green", borderRadius: "3px", color: "white" }} onChange={handleChange} name="status" id="status" value={stat} className="opt">
            <option style={{ backgroundColor: "green" }} className="opt" value="completed">Completed</option>
            <option style={{ backgroundColor: "orangered" }} className="opt" value="notcompleted">NotCompleted</option>
        </select>
        <div className="flex_parent">
            <button onClick={handleEdit} className="edit_but">Edit</button>
            <button onClick={handleDelete} className="del_but">Delete</button>
        </div>
    </div>);
}

Todocard.propTypes = {
    name: propTypes.string,
    description: propTypes.string,
    st: propTypes.string,
    id: propTypes.string,
    deleteTodo: propTypes.func,
    editTodo: propTypes.func,
    updateStatus: propTypes.func
}

export default Todocard