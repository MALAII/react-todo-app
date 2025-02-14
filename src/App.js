import { useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import useLocalStorage from "./lib/useLocalStorage";
import bg from "../src/icons/bg.jpg"; // Import the background image

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  // const [completedAll, setCompletedAll] = useState(false);
  const [filter, setFilter] = useState("All");
  const [currentlyEditing, setCurrentlyEditing] = useState("");

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function deleteAll() {
    setTodos([]);
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function updateTodo(text, id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: text } : todo
      )
    );
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div
    className="flex  items-center text-center min-h-screen p-4 bg-cover bg-center relative"
    style={{ backgroundImage: `url(${bg})` }} // Set Background Image
  >
    <div className="bg-white shadow-lg rounded-lg p-6 ml-0 md:ml-12 w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl">
      
      {/* Title */}
      <h2 className="text-gray-800 text-2xl font-bold mb-4 text-center">
        TO DO LIST
      </h2>
  
      {/* Form */}
      <Form addTodo={addTodo} />
  
      {/* Task List or Motivational Caption */}
      {todos.length === 0 ? (
        <p className="text-gray-500 font-semibold text-center mt-6 text-lg italic">
          ✨ "Your day is waiting to be planned! Start by adding a task." ✨
        </p>
      ) : (
        <ul className="space-y-3 mt-4">
          {todos.filter(FILTER_MAP[filter]).map(({ text, id, completed }) => (
            <Todo
              key={id}
              text={text}
              id={id}
              completed={completed}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              isEditing={id === currentlyEditing}
              setCurrentlyEditing={setCurrentlyEditing}
            />
          ))}
        </ul>
      )}
  
      {/* Buttons & Filters */}
      {todos.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {filterList}
          </div>
  
          {/* Delete All Button */}
          <button
            onClick={deleteAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
          >
            Delete All
          </button>
        </div>
      )}
    </div>
  
    {/* Copyright Notice */}
    <p className="absolute md:bottom-12  bottom-4 right-0 text-center  md:right-36 text-gray-200 text-sm">
      © 2025 Developed by <span className="font-semibold">Malaiyarasi</span>
    </p>
  </div>
  
  
  );
}

export default App;
