import Todoform from "./Components/Todoform.jsx"
import Todocard from "./Components/Todocard"
import "./App.css"
import list from "./list.json"
import { v4 } from "uuid"
import { useState } from "react"

const App = () => {

  const [todos, setTodos] = useState(list);
  const [editdata, setEditdata] = useState(null);
  const [filter, setFilter] = useState(null);

  const addTodo = (formstate) => {
    if (filter) {
      const filtertodo = { ...formstate, id: v4(), todostatus: "notcompleted" };
      const tmp1 = [...filter, filtertodo];
      setFilter(tmp1);

      const todo = { ...formstate, id: v4(), todostatus: "notcompleted" };
      const tmp = [...todos, todo];
      setTodos(tmp);
    }
    else {
      const todo = { ...formstate, id: v4(), todostatus: "notcompleted" };
      const tmp = [...todos, todo];
      setTodos(tmp);
    }
  };

  const deleteTodo = (id) => {
    if (filter) {
      const tmp1 = filter.filter((todo) => todo.id != id);
      setFilter(tmp1);

      const tmp = todos.filter((todo) => todo.id != id);
      setTodos(tmp);
    }
    else {
      const tmp = todos.filter((todo) => todo.id != id);
      setTodos(tmp);
    }
  }

  const editTodo = (editdata) => {
    setEditdata(editdata);
    console.log(editdata);
  }

  const loadEditvalues = (formstate, id) => {
    console.log(formstate);
    console.log(id);
    if (filter) {
      const tmp1 = [...filter];
      const todoindex1 = tmp1.findIndex((todo) => todo.id == id);

      tmp1[todoindex1] = { ...tmp1[todoindex1], ...formstate, }
      console.log(tmp1);

      setFilter(tmp1);

      const tmp = [...todos];
      const todoindex = tmp.findIndex((todo) => todo.id == id);

      tmp[todoindex] = { ...tmp[todoindex], ...formstate, }
      console.log(tmp);

      setTodos(tmp);
    }
    else {
      const tmp = [...todos];
      const todoindex = tmp.findIndex((todo) => todo.id == id);

      tmp[todoindex] = { ...tmp[todoindex], ...formstate, }
      console.log(tmp);

      setTodos(tmp);
    }

    setEditdata(null);
  }

  const updateStatus = (stat, id) => {
    if (filter) {
      const tmp1 = [...filter];
      const todoindex1 = tmp1.findIndex((todo) => todo.id == id);
      tmp1[todoindex1] = { ...tmp1[todoindex1], todostatus: stat };
      console.log(tmp1);

      setFilter(tmp1);

      const tmp = [...todos];
      const todoindex = tmp.findIndex((todo) => todo.id == id);
      tmp[todoindex] = { ...tmp[todoindex], todostatus: stat };
      console.log(tmp);

      setTodos(tmp);
    }
    else {
      const tmp = [...todos];
      const todoindex = tmp.findIndex((todo) => todo.id == id);
      tmp[todoindex] = { ...tmp[todoindex], todostatus: stat };
      console.log(tmp);

      setTodos(tmp);
    }
  }

  const cardFilter = (stat) => {
    if (stat != "all") {
      const tmp = [...todos];
      const todo = tmp.filter((obj) => obj.todostatus == stat);
      console.log(todo);
      setFilter(todo);
    }
    else {
      console.log(todos);
      setFilter(null);
    }
  }

  return (
    <>
      {console.log(todos)}
      <Todoform addTodo={addTodo}
        editdata={editdata}
        loadEditvalues={loadEditvalues}
        cardFilter={cardFilter} />
      <div className="todocard_flex">
        {filter ? (<>{filter.map((obj) => (
          <Todocard key={obj.id}
            id={obj.id}
            name={obj.todoname}
            description={obj.tododescription}
            st={obj.todostatus}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            updateStatus={updateStatus}
          />
        )
        )}</>) : (<>
          {todos.map((obj) => (
            <Todocard key={obj.id}
              id={obj.id}
              name={obj.todoname}
              description={obj.tododescription}
              st={obj.todostatus}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              updateStatus={updateStatus}
            />
          )
          )}</>)}
      </div>
    </>
  )
}

export default App
