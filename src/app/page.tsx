
import './globals.css'
import Image from 'next/image'
import faixa from 'public/assets/faixa.png'

export default function Home() {
  return (
    <main className="   text-black bg-white min-h-screen flex-col items-center justify-between ">
      <div className="lg:text-xl font-body z-10  w-full items-center justify-between text-sm ">
    
        <div className='bg-azul-900 w-[100vw]'>
          <h1 className="lg:text-2xl text-lg p-2 px-2 text-white ">Universidade Federal de Jatai</h1>
        </div>
        
        <div >
          <Image src={faixa}  className=' w-[100vw] lg:h-[15vh]' alt="" />
        </div>

        <form className='relative lg:h-[90vh] md:items-center pt-[44px] pb-36 px-5 flex flex-col gap-3  items-start'>
          <div className='xl:w-[50vw] lg:w-[90vw]  lg:pb-16'>
            <h1 className='lg:text-2xl text-lg  font-bold self'>Preencha seus dados</h1>
            <p>Preencha seus dados para prosseguir com o pagamento de GRU</p>
          </div>

          <div className='lg:flex lg:flex-row lg:gap-28 '>        
            <div className='flex flex-col gap-8 my-5 lg:my-0'>
              <label className='lg:text-2xl text-lg  font-bold' htmlFor="">Selecione o tipo de pagamento</label>
              <label className=' flex flex-row gap-3 '  htmlFor="">
                <input  className="w-6" name="tipopag" type="radio"  required></input>
                Multa de atraso
              </label>
              <label className=' flex flex-row gap-3 ' htmlFor="">
                <input className=" w-6" name="tipopag" type="radio"  required></input>
                Segunda via de crachá    
              </label>
              <label className=' flex flex-row gap-3 ' htmlFor="">
                <input className="shadow-md w-6 border-blue-900" name="tipopag" type="radio"  required></input>
                Ambas as opções
              </label>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-3'>
                <label className='font-bold' htmlFor="cpf">CPF ou CNPJ do Contribuinte</label>
                <input className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500' name="cpf" type="text" placeholder="CPF completo" required></input>      
              </div>
              <div className='flex flex-col gap-3'>
                <label className='font-bold' htmlFor="nome">Nome completo do contribuinte</label>
                <input className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500' name="nome" type="text" placeholder="Nome completo" required></input> 
              </div>
              <div className='flex flex-col gap-3'>
              <label  className='font-bold' htmlFor="valor">Valor</label>
                <input className='lg:w-[28.75rem] lg:text-xl  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500' name="valor" type="number" placeholder="Valor" required></input>
              </div>      
              <button className='lg:self-end lg:w-56 lg:h-10 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 hover:bg-azul-200 duration-300 shadow-lg shadow-blue-100 self-center mt-5 w-36 h-8 rounded-full bg-azul-500  text-blue-50 font-bold ' type="submit">Enviar</button>
            </div> 
          </div>
        </form>
        

        
        <footer className='border-t-2 flex flex-col md:flex-row md:justify-around items-center'>
          <div className='py-4 flex flex-col place-items-center'>
            <h3 className='font-bold pb-3'>Contato</h3>
            <ul className='flex flex-col gap-3 items-center'>
              <li>secom@ufj.edu.br</li>
              <li>secom@ufj.edu.br</li>
              <li>Seti (00) 000 - 000</li>
            </ul>
          </div>
          <div className='py-4 flex flex-col place-items-center'>
            <h3 className='font-bold pb-3'>Redes sociais</h3>
            <ul className='flex flex-col gap-3 items-center'>
              <li><a href="">Instagram</a></li>
              <li><a href="">Youtube</a></li>
              <li><a href="">Twitter</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  )
}
