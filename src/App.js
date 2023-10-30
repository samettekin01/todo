import { useRef, useState } from 'react';
import { BsPencilSquare, BsXSquare } from 'react-icons/bs';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const todoRef = useRef();

  const addTodo = () => {
    if (!todo) {
      alert("Please, Add todo");
      return;
    }
    const item = {
      todo: todo,
      done: false
    };
    setTodoList(prev => [...prev, item]);
    setTodo("");
    todoRef.current.focus();
  }

  const doneTodo = (i) => {
    const updatedList = todoList.map((item, index) =>
      index === i ? { ...item, done: !item.done } : item
    );
    setTodoList(updatedList);
  }
  const remove = (i) => {
    const list = [...todoList];
    list.splice(i, 1);
    setTodoList(list);
  }
  const handleEdit = (i) => {
    const list =[...todoList];
    todo ? list[i].todo = todo : alert("Please, add todo")
    setTodoList(list)
  }

  return (
    <div className="App flex justify-center">
      <div className='w-80 text-center mt-10'>
        <span className='text-2xl text-white'>TODO LIST</span>
        <input
          ref={todoRef}
          type='text'
          placeholder='add todo'
          className='outline rounded-sm m-3 p-1 outline-1 w-64 shadow-xl'
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <button
          className='outline outline-1 rounded-sm p-1 shadow-xl bg-sky-800 text-white active:opacity-80'
          onClick={addTodo}>Add</button>
        <div className='ml-2 text-left overflow-auto h-96 items-center relative'>
          {todoList && todoList.map((data, i) =>
            <div
              className='p-1 mb-2 flex items-center  bg-sky-800 text-white rounded-sm shadow-xl border'
              key={i}
            >
              <div
                className='w-5/6'
                onClick={() => doneTodo(i)}
                style={{ textDecoration: data.done ? "line-through" : "none" }}
              >{data.todo}</div>
              <div className='flex flex-row ml-auto text-2xl cursor-pointer'>
                <BsPencilSquare className='active:text-red-700' onClick={() => handleEdit(i)} />
                <BsXSquare className='active:text-red-700' onClick={() => remove(i)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
