import { createContext, useState, useContext } from 'react';

const ProCtx = createContext();

function ProProvider({ children }) {
  const [proMember, setProMenber] = useState(false);

  return (
    <ProCtx.Provider value={{ proMember, setProMenber }}>
      {children}
    </ProCtx.Provider>
  );
}
function useProSub() {
  const ctx = useContext(ProCtx);
  if (ctx === undefined)
    throw new Error('ProCtx was used outside of the ProProvider');
  return ctx;
}
export { ProProvider, useProSub };
