import { useState } from "react";
import { nanoid } from "nanoid";
import { FaPlus } from "react-icons/fa";

function Form({ addTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const todoText = text.trim();
    if (!todoText) return;
    addTodo({
      text: todoText,
      id: `todo-${nanoid()}`,
      completed: false
    });
    clearForm();
  }

  function clearForm() {
    setText("");
  }

  return (
    <form className="text-black flex gap-2 w-full mb-4" onSubmit={handleSubmit}>
      {/* Input Field */}
      <label htmlFor="todo" className="flex-1">
        <span className="hidden">Todo</span>
        <input
          className="w-full px-3 py-2 border-b border-black bg-transparent outline-none text-lg"
          type="text"
          name="todo"
          placeholder="Add New Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      {/* Add Button with React Icon */}
      <button
        className="bg-blue-600 text-white w-10 h-10 flex justify-center items-center rounded-full shadow-lg hover:bg-blue-700 transition"
        type="submit"
      >
        <FaPlus size={16} />
        <span className="sr-only">Add Todo</span>
      </button>
    </form>
  );
}

export default Form;
