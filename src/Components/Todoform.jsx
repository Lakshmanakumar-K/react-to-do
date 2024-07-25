import "./Todoform.css"
import { useState, useEffect } from "react";
import propTypes from "prop-types"


const initialstate = { todoname: "", tododescription: "" };

const val = "all";

const Todoform = ({ addTodo, editdata, loadEditvalues, cardFilter }) => {

    const [formstate, setFormState] = useState(initialstate);
    const [filterstat, setFilterstat] = useState(val)

    const handleChange = (e) => {
        setFormState({ ...formstate, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (e) => {
        setFilterstat(e.target.value);
        cardFilter(e.target.value);
    };

    useEffect(() => {
        if (editdata) {
            setFormState({ todoname: editdata.name, tododescription: editdata.description });
        }
    }, [editdata]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editdata) {
            loadEditvalues(formstate, editdata.id);
            setFormState(initialstate);
        }
        else {
            addTodo(formstate);
            setFormState(initialstate);
        }
    };

    return (
        <>
            {/* {console.log(formstate)} */}
            <div className="todoform_flex">
                <div className="todoform_child">
                    Mytodo
                    <div className="todoform_child2">
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} className="todoform_input" type="text" name="todoname" value={formstate.todoname} placeholder="Todo Name" id="name" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input onChange={handleChange} className="todoform_input" type="text" name="tododescription" value={formstate.tododescription} placeholder="Todo Description" id="description" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="todoform_button" type="submit">{editdata ? "Update" : "AddTodo"}</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="todoform_flex2">
                <div style={{ margin: "10px 100px", fontSize: 20 }}><b>My Todos</b></div>
                <div style={{ margin: "10px 100px" }}>
                    <label htmlFor="status" style={{ fontSize: 20 }}><b>Status Filter : </b></label>
                    <select style={{ backgroundColor: filterstat == "completed" ? "green" : "orangered", borderRadius: "3px", height: 30 }} name="status" id="status" onChange={handleStatusChange} value={filterstat}>
                        <option style={{ backgroundColor: "orangered" }} value="all">All</option>
                        <option style={{ backgroundColor: "green" }} value="completed">Completed</option>
                        <option style={{ backgroundColor: "orangered" }} value="notcompleted">Not Completed</option>
                    </select>
                </div>
            </div>
        </>
    );
}

Todoform.propTypes = {
    addTodo: propTypes.func,
    editdata: propTypes.object,
    loadEditvalues: propTypes.func,
    cardFilter: propTypes.string,
}

export default Todoform