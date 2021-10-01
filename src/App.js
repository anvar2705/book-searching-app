import React from "react";
import './App.scss'
import SearchContainer from "./components/search/SearchContainer";
import Content from "./components/content/СontentContainer";

function App() {
  return (
    <div className="App">
     <SearchContainer/>
     <Content/>
    </div>
  )
}

export default App;
