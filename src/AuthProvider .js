// MyContext.js
import React, { createContext, useState } from 'react';

// Create a context with a default value (in this case, an empty object)
const MyContext = createContext({});

// Create a provider component
// const MyContextProvider = ({ children }) => {
//   const [state, setState] = useState({
//     data: '',
//     updateData: (newData) => {
//       setState((prevState) => ({ ...prevState, data: newData }));
//     },
//   });
//    const [cameravalue, setcameravalue] = useState({
//     cameravalueData: '',
//     updateDatacamera: (newData) => {
//       setcameravalue((prevState) => ({ ...prevState, cameravalueData: newData }));
//     },
//   });

//   // value={{ name: [name, setName], color: [color, setColor] }}
//   return (
//     <MyContext.Provider value={{state, cameravalue, setcameravalue}}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export { MyContext, MyContextProvider };


const MyContextProvider = ({ children }) => {
  const [state1, setState1] = useState('State 1');
  const [state2, setState2] = useState('State 2');

  return (
    <MyContext.Provider value={{ state1, setState1, state2, setState2 }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
