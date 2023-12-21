
import React from 'react';

const Modal = ({ isVisible, handleCloseModal, generatedLink }) => {
  
  return isVisible && (
    <div className='m-auto top-0 left-0 bottom-0 right-0 absolute bg-slate-900 bg-opacity-25 w-[100vw] h-[100vw]'>
            <div className='flex flex-col  items-center rounded-xl  justify-center m-auto top-0 left-0 bottom-0 right-0 absolute bg-slate-50 w-[60vw] h-[30vh] shadow-2xl shadow-slate-300 '>
        <button onClick={handleCloseModal} className='self-end px-5 font-bold text-2xl hover:text-gray-500'>
            X
            </button>
        <div className='flex flex-col rounded-full'>
          <h3 className='lg:text-2xl text-lg  font-bold self '>Link do GRU gerado com sucesso</h3>
          <p>Clique no botão criado a seguir para prosseguir</p>
          <a href={generatedLink} className=' rounded-full bg-azul-500  text-blue-50 font-bold py-2 my-5 text-center shadow-md hover:shadow-azul-200 hover:bg-blue-700 hover:ease-in-out cursor-pointer'>
            Ir para o Pagamento
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal ;
