import React from "react";

export const InputRadio = ({typeValue, handleEscolha}) => {

    return(
        <div className='flex flex-col gap-8 my-5 lg:my-0'>
              <label 
              className='lg:text-2xl text-lg  font-bold' 
              htmlFor=""
              >Selecione o tipo de pagamento</label>
              <label className=' flex flex-row gap-3 '  htmlFor="">
                <input  
                className="w-6" 
                name="tipopag" 
                type="radio"  
                required
                value="multaAtraso"
                checked={typeValue === 'multaAtraso'}
                onChange={handleEscolha}
                ></input>
                Multa de atraso
              </label>
              <label className=' flex flex-row gap-3 ' htmlFor="">
                <input 
                className=" w-6" 
                name="tipopag" 
                type="radio"  
                required
                  value="segundaVia"
                  checked={typeValue === 'segundaVia'}
                  onChange={handleEscolha}
                  ></input>
                Segunda via de crachá    
              </label>
              <label className=' flex flex-row gap-3 ' htmlFor="">
                <input 
                className="shadow-md w-6 border-blue-900" 
                name="tipopag" 
                type="radio"  
                required
                value="ambas"
                checked={typeValue === 'ambas'}
                onChange={handleEscolha}
                ></input>
                Outras taxas
              </label>
            </div>
    )
}

export default InputRadio;