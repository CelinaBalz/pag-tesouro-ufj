import React from 'react';


export const formatarCPF = (value) => {

    const cleanedValue = value.replace(/\D/g, '')
    
    let cpfFormatted = '';
    if (cleanedValue.length <= 11) {
      cpfFormatted = cleanedValue
        .replace(/^(\d{3})(\d{3})?(\d{3})?(\d{1,2})?/, (_, p1, p2, p3, p4) => {
          let result = p1;
          if (p2) result += `.${p2}`;
          if (p3) result += `.${p3}`;
          if (p4) result += `-${p4}`;
          return result;
        });
    }

        return cpfFormatted
    }

const InputCPF = ({ cpf, handleChangeCPF }) => {
    
    return (
        <div className='flex flex-col '>
        <label className='font-bold' htmlFor="cpf">CPF ou CNPJ do Contribuinte</label>
        <input 
        className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneinvalid:border-pink-500 invalid:text-pink-60 ' 
        name="cpf" 
        type="text" 
        placeholder="CPF completo" 
        required
        value={cpf}
        onChange={handleChangeCPF}
        ></input>      
        <div id='erroCPF' className='hidden bg-red-200 border-red-300 border'>
        <p className='text-sm py-1 font-semibold text-red-900 px-2'>CPF inválido</p>
      </div>
      </div>
    )
}

export default InputCPF