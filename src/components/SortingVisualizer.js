import { useEffect, useState } from "react";
import "../styles/SortingVisualizer.css";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import { getQuickSortAnimations } from "../algorithms/QuickSort";
import { getInsertionSortAnimations } from "../algorithms/InsertionSort";
import { getSelectionSortAnimations } from "../algorithms/SelectionSort";
import { getBubbleSortAnimations } from "../algorithms/BubbleSort";

let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = 58;

const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";
const ANIMATION_SPEED_MS = 5;

const DISABLED_BUTTON = "Currently Disabled";
const ENABLED_BUTTON = {
  nlogn: "O(NlogN) Time Complexity",
  nSquare: "O(N^2) Time Complexity",
};

const SortingVisualizer = (props) => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(25, WINDOW_HEIGHT - 30));
    }
    setArray(array);
    restoreStoreButtons();
  };

  const disableSortButtons = () => {
    document.getElementById("generate").disabled = true;
    let buttonStyle = document.getElementById("generate").style;
    document.getElementById("generate").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.backgroundColor = "#000000";

    document.getElementById("mergeSort").disabled = true;
    buttonStyle = document.getElementById("mergeSort").style;
    document.getElementById("mergeSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("quickSort").disabled = true;
    buttonStyle = document.getElementById("quickSort").style;
    document.getElementById("quickSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("insertionSort").disabled = true;
    buttonStyle = document.getElementById("insertionSort").style;
    document.getElementById("insertionSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("selectionSort").disabled = true;
    buttonStyle = document.getElementById("selectionSort").style;
    document.getElementById("selectionSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("bubbleSort").disabled = true;
    buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";
  };

  const restoreStoreButtons = () => {
    document.getElementById("generate").disabled = false;
    let buttonStyle = document.getElementById("generate").style;
    document.getElementById("generate").title = ENABLED_BUTTON.nlogn;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";

    document.getElementById("mergeSort").disabled = false;
    buttonStyle = document.getElementById("mergeSort").style;
    document.getElementById("mergeSort").title = ENABLED_BUTTON.nlogn;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";

    document.getElementById("quickSort").disabled = false;
    buttonStyle = document.getElementById("quickSort").style;
    document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";

    document.getElementById("bubbleSort").disabled = false;
    buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";

    document.getElementById("selectionSort").disabled = false;
    buttonStyle = document.getElementById("selectionSort").style;
    document.getElementById("selectionSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";

    document.getElementById("insertionSort").disabled = false;
    buttonStyle = document.getElementById("insertionSort").style;
    document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";
  };

  const mergeSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getMergeSortAnimations(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == "comparision1" ||
        animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const color =
          animations[i][0] == "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [overwrite, barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const quickSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getQuickSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == "comparision1" ||
        animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] == "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );

    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const bubbleSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == "comparision1" ||
        animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] == "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );

    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const insertionSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getInsertionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );

    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const selectionSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getSelectionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );

    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  return (
    <section>
      <nav className="buttons">
        <button
          title="Generates a new random array"
          id="generate"
          onClick={() => resetArray()}
        >
          Generate New Array
        </button>
        <button
          title="O(NlogN) Time Complexity"
          id="mergeSort"
          onClick={() => mergeSort()}
        >
          Merge Sort
        </button>
        <button
          title="O(N^2) Time Complexity"
          id="quickSort"
          onClick={() => quickSort()}
        >
          Quick Sort
        </button>
        <button
          title="O(N^2) Time Complexity"
          id="bubbleSort"
          onClick={() => bubbleSort()}
        >
          Bubble Sort
        </button>
        <button
          title="O(N^2) Time Complexity"
          id="insertionSort"
          onClick={() => insertionSort()}
        >
          Insertion Sort
        </button>
        <button
          title="O(N^2) Time Complexity"
          id="selectionSort"
          onClick={() => selectionSort()}
        >
          Selection Sort
        </button>
      </nav>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};
// }

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
