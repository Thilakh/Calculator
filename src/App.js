import { useState,useEffect } from "react";

// import * as math from "mathjs";

import "./App.css";
import Button from "./components/Js/Button"
import Input from "./components/Js/Input";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
   const [isDarkMode, setIsDarkMode] = useState(false); // Theme state

   const isOperator = (char) => ["+", "-", "*", "÷"].includes(char);

     useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "black" : "white";
  }, [isDarkMode]);
  
// const toggleSign = () => {
//   if (!text || text === "0") return; 

//   let expression = text.match(/(\d+(\.\d+)?|[+\-*/])/g);
//   if (!expression) return;

//   let lastIndex = expression.length - 1;
//   let lastValue = expression[lastIndex];

//   if (!isNaN(lastValue)) {
    
//     expression[lastIndex] = (-parseFloat(lastValue)).toString();
//   } else if (isOperator(lastValue) && expression[lastIndex + 1]) {
    
//     expression[lastIndex + 1] = (-parseFloat(expression[lastIndex + 1])).toString();
//   }

//   setText(expression.join("")); 
// };
const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
};
const addToText = (val) => {
  if ((text === "" || text === "0") && isOperator(val)) return;
  if (text === "0" && !isOperator(val)) {
    setText(val);
  } 
  else if (!(isOperator(text.slice(-1)) && isOperator(val))) {
    setText((prevText) => prevText + val);
  }
};
//   const addToText = (val) => {
//   const lastChar = text.slice(-1);
//    if (isOperator(lastChar) && isOperator(val)) {
//     return; 
//   }

//   setText((prevText) => prevText + val);
// };

//   const calculateResult = () => {
//   if (!text) return;
  
//   try {
//     setResult(math.evaluate(text));
//   } catch (error) {
//     setResult("Error");
//   }
// };

const calculateResult = () => {
  if (!text) return;

  try {
    let sanitizedText = text.replace(/÷/g, "/").replace(/×/g, "*");
    
    let expression = sanitizedText.match(/(\d+(\.\d+)?|[+\-*/%])/g);

    if (!expression) throw Error;

    let result = parseFloat(expression[0]); 

    for (let i = 1; i < expression.length; i += 2) {
      let operator = expression[i];
      let nextNumber = parseFloat(expression[i + 1]);

      if (isNaN(nextNumber)) throw Error;

      switch (operator) {
        case "+":
          result += nextNumber;
          break;
        case "-":
          result -= nextNumber;
          break;
        case "*":
          result *= nextNumber;
          break;
        case "%":
          if (nextNumber === 0) throw Error; 
          result %= nextNumber;
          break;
        case "/":
          if (nextNumber === 0) throw Error;
          result /= nextNumber;
          break;
        default:
          throw Error;
      }
    }

    setResult(result);
  } catch (error) {
    setResult("Error");
  }
};

  const deleteLast = () => {
  setText((text) => text.slice(0, -1));
};

  const resetInput = () => {
    setText("");
    setResult("");
  };

  const buttonColor = "#f2a33c";
  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="calc-wrapper">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
      <Input text={text || "0"} result={result} />
        <div className="row">
          <Button symbol="AC" color={isDarkMode?"white":"black"} handleClick={resetInput} />
          <Button symbol="Del" color={isDarkMode?"white":"black"} handleClick={deleteLast}/>
          {/* <Button symbol="+/-" handleClick={toggleSign} /> */}
          <Button symbol="%" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="7" handleClick={addToText} />
          <Button symbol="8" handleClick={addToText} />
          <Button symbol="9" handleClick={addToText} />
          <Button symbol="÷" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="4" handleClick={addToText} />
          <Button symbol="5" handleClick={addToText} />
          <Button symbol="6" handleClick={addToText} />
          <Button symbol="×" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="1" handleClick={addToText} />
          <Button symbol="2" handleClick={addToText} />
          <Button symbol="3" handleClick={addToText} />
          <Button symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="." handleClick={addToText} />
          <Button symbol="0" handleClick={addToText} />
          <Button symbol="=" handleClick={calculateResult} />
          <Button symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
      </div>
    </div>
  );
};

export default App;
