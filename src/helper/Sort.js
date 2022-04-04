class Sort {
  constructor(type, arrayInfos) {
    this.type = type.toLowerCase();
    this.arrayInfos = { ...arrayInfos };
  }

  //-------------------------- helpers --------------------------------------

  // swap 2 items in an array.
  #swap = (i, j, arr) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  swap(arr, x, y) {
    [arr[x], arr[y]] = [arr[y], arr[x]];
  }

  // Merge two sorted arrays
  merge(array1, array2) {
    let merged = [];
    while (array1.length && array2.length) {
      if (array1[0] < array2[0]) {
        merged.push(array1.shift());
      } else if (array1[0] > array2[0]) {
        merged.push(array2.shift());
      } else {
        merged.push(array1.shift(), array2.shift());
      }
    }
    return [...merged, ...array1, ...array2];
  }

  //----------------------------------------------------------------

  #quickSort(array, left = 0, right = array.length - 1, steps = [], pos = "") {
    steps.push({
      des: "",
      currArray: [...array],
      indexes: `${left}/${right}`,
      pointer: `${pos == "left" ? left : right}`,
    });

    let shift = left;
    if (left < right) {
      for (let i = left + 1; i <= right; i++) {
        if (array[i] < array[left]) {
          steps.push({
            des: "",
            currArray: [...array],
            indexes: `${i}/${right}`,
            pointer: `${pos == "left" ? left : right}`,
          });
          this.swap(array, i, ++shift);
          steps.push({
            des: "",
            currArray: [...array],
            indexes: `${i}/${right}`,
            pointer: `${pos == "left" ? left : right}`,
          });
        }
      }

      this.swap(array, left, shift);
      steps.push({
        des: "",
        currArray: [...array],
        indexes: `${left}/${right}`,
        pointer: `${pos == "left" ? left : right}`,
      });
      let pivotIndex = shift;

      this.#quickSort(array, left, pivotIndex - 1, steps, "left");

      this.#quickSort(array, pivotIndex + 1, right, steps, "right");
      steps.push({
        des: "",
        currArray: [...array],
        indexes: `${left}/${right}`,
        pointer: `-1`,
      });
    }
    return steps;
  }

  #sorts = {
    bubble: (array) => {
      const steps = [];
      let pointer = array.length - 1;
      while (pointer > 0) {
        for (let i = 0; i < pointer; i++) {
          if (array[i] > array[i + 1]) {
            this.#swap(i, i + 1, array);
            steps.push({
              currArray: [...array],
              des: `Compared ${array[i]} and ${array[i + 1]} :: swap because ${
                array[i]
              } is less than ${array[i + 1]}`,
              indexes: `${i}/${i + 1}`,
              pointer,
            });
          } else
            steps.push({
              currArray: [...array],
              des: `Compared ${array[i]} and ${
                array[i + 1]
              } :: no swapping because ${array[i]} is less than ${
                array[i + 1]
              } `,
              indexes: `${i}/${i + 1}`,
              pointer,
            });
        }
        pointer--;
      }
      steps.push({
        currArray: [...array],
        des: "array sorted!",
        indexes: "",
        pointer: -2,
      });
      return steps;
    },

    // -------- selection ---------:
    selection: (array) => {
      const steps = [];
      let pointer = array.length - 1;
      let maxIdx;
      while (pointer > 0) {
        maxIdx = 0;
        for (let i = 0; i <= pointer; i++) {
          if (array[i] > array[maxIdx]) {
            //changing max
            steps.push({
              currArray: [...array],
              des: `Compared ${array[i]} and ${array[maxIdx]} :: new maximum : ${array[i]}`,
              indexes: `${maxIdx}/${i}`,
              pointer,
            });
            maxIdx = i;
          }
          //continue
          else {
            steps.push({
              des: `no changes ::  because ${array[i]} is less than the maximum `,
              currArray: [...array],
              indexes: `${maxIdx}/${i}`,
              pointer,
            });
          }
        }
        steps.push({
          des: `move ${array[maxIdx]} to the end because it is the maximum `,
          currArray: [...array],
          indexes: `${maxIdx}`,
          pointer,
        });
        this.#swap(maxIdx, pointer, array);
        pointer--;
      }
      steps.push({
        currArray: [...array],
        des: "array sorted!",
        indexes: "",
        pointer: -2,
      });

      return steps;
    },

    insertion: (array) => {
      const steps = [];
      let pointer;
      let temp;
      for (let i = 1; i < array.length; i++) {
        pointer = i - 1;
        temp = i;
        while (pointer >= 0) {
          if (array[pointer] > array[temp]) {
            this.#swap(pointer, temp, array);
            steps.push({
              des: `Compared ${array[pointer]} and ${array[temp]} :: swapped because ${array[pointer]} is less than ${array[temp]}`,
              currArray: [...array],
              indexes: `${i}/${pointer}`,
              pointer,
            });
            temp--;
            pointer--;
          } else {
            steps.push({
              des: `Compared ${array[pointer]} and ${array[temp]} :: no swap because ${array[pointer]} is less than ${array[temp]}`,
              currArray: [...array],
              indexes: `${i}/${pointer}`,
              pointer,
              sortedIdx: array[pointer + 1],
            });
            break;
          }
        }
      }

      steps.push({
        des: `Array Sorted!`,
        currArray: [...array],
        indexes: ``,
        pointer: -2,
      });
      return steps;
    },
    // -------- quick ---------:
    quick: (array) => {
      return this.#quickSort(array);
    },

    // -------- merge ---------:
  };

  getSortingData = () => {
    return this.#sorts[this.type]
      ? this.#sorts[this.type]([...this.arrayInfos.values])
      : "no sort found!";
  };
}
export default Sort;
