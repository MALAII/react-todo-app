import { useEffect, useState, useRef } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

function Todo({ text, id, completed, deleteTodo, toggleTodo, updateTodo, isEditing, setCurrentlyEditing }) {
  const [newText, setNewText] = useState(text);
  const editingInput = useRef(null);

  useEffect(() => {
    if (!isEditing) return;
    editingInput.current.focus();
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    updateTodo(text, id);
    setCurrentlyEditing();
  }

  function handleEditInputChange(e) {
    setNewText(e.target.value);
    updateTodo(e.target.value, id);
  }

  function handleEditButtonClick() {
    isEditing ? setCurrentlyEditing("") : setCurrentlyEditing(id);
  }

  return (
    <li className="relative flex items-center text-black mb-3 p-2 border rounded bg-gray-100" id={id} key={id} data-completed={completed}>
      {/* Checkbox and Task Text */}
      <label htmlFor={`input-${id}`} className="group cursor-pointer flex items-center">
        <input
          checked={completed}
          onChange={() => toggleTodo(id)}
          className="appearance-none w-4 h-4 mr-2 border rounded-full transition duration-300 group-hover:shadow-checkbox group-hover:border-blue-500 checked:border-blue-500 checked:bg-blue-500"
          id={`input-${id}`}
          type="checkbox"
        />
        <span className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-black'}`}>
          {text}
        </span>
      </label>

      {/* Editing Mode */}
      <form className={!isEditing && 'hidden'} onSubmit={handleSubmit}>
        <input ref={editingInput} className="absolute left-7.5 top-2  outline-none border-0 border-b border-black" id={`edit-box-${id}`} type="text" value={newText} onChange={handleEditInputChange}/>
        <button className="hidden" type="submit">Update</button>
      </form>

      {/* Action Buttons */}
      <div className="ml-auto flex space-x-3">
        <button onClick={handleEditButtonClick} className="text-blue-600 hover:text-blue-800 transition">
          <MdOutlineEdit size={18} />
        </button>
        <button onClick={() => deleteTodo(id)} className="text-red-600 hover:text-red-800 transition">
          <FaTrash size={18} />
        </button>
      </div>
    </li>
  );
}

export default Todo;
