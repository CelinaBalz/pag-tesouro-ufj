import React from 'react' 

const InputNome = ({ name, handleChangeName }) => {
    return (
        <div className='flex flex-col '>
        <label className='font-bold' htmlFor="nome">Nome completo do contribuinte</label>
        <input 
          className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneinvalid:border-pink-500 invalid:text-pink-60 ' 
          name="nome" 
          type="text" 
          id='nome'
          placeholder="Nome completo" 
          required
          value={name}
          onChange={handleChangeName}
        ></input> 
      </div>
    )
}

export default InputNome