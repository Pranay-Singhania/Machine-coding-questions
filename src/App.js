import React, { useEffect, useState } from "react";
import "./App.css";

let order = 0;
let isAllClicked = false;
function App() {
  const [boxState, setBoxState] = useState(getBoxes("initial"));

  useEffect(() => {
    if (boxState.some((item) => !item.isClicked)) isAllClicked = false;
    else isAllClicked = true;

    if (isAllClicked)
      boxState.forEach((item, i) => {
        return setTimeout(() => {
          let tempBox = [...boxState];
          tempBox[i].isClicked = false;
          setBoxState(tempBox);
        }, 1000 * (i + 1));
      });
  }, [boxState]);

  function getBoxes(type) {
    let boxesData = [];
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          if (type === "initial") return boxesData.push({ i, j, isClicked: false, order: null });
          return (
            <div
              className={`box ${boxState.find((item) => item.i === i && item.j === j)?.isClicked && "bgGreen"}`}
              key={i * 10 + j}
              // style={{ backgroundColor: boxState.find((item) => item.i === i && item.j === j)?.isClicked && "green" }}
              onClick={() => changeColor(i, j)}></div>
          );
        }
        return <div key={i * 10 + j}></div>;
      });
    });
    if (type === "initial") return boxesData;
    return boxes;
  }

  const changeColor = (i, j) => {
    let temp = [...boxState];
    const selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = true;
    selectedBox.order = ++order;
    temp.sort((a, b) => a.order - b.order);
    setBoxState(temp);
  };

  console.log(boxState);

  return (
    <div className="App">
      <div className="box-container">{getBoxes()}</div>
    </div>
  );
}

export default App;
