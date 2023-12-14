'use client'

import { useState } from 'react'
import './globals.css'
import Image from 'next/image'
import faixa from 'public/assets/faixa.png'

export default function Home() {
  const [cpf, setCPF] = useState('')
  const [erroCPF, setErroCPF] = useState('')
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [typeValue, setTypeValue] = useState('multaAtraso')
  

  {/* ------------------- Fazendo o modal abrir  ----------------------------------------------------------------------- */}

  const [modalVisible, setModalVisible] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  
  {/* ------------------- GERANDO URL CUSTOMIZADA  ----------------------------------------------------------------------- */}

  
  const generateURL = () => {
    const baseURL = 'https://pagtesouro.tesouro.gov.br/portal-gru/#/pagamento-gru/formulario?servico=014423%3Fservico%3D35&jurosEncargos=0%3Fservico%3D35&moraMulta=0%3Fservico%3D35&descontosAbatimentos=0%3Fservico%3D35';
  
    const cleanCPF = cpf.replace(/\D/g, ''); // Remove não números do CPF
    const encodedName = encodeURIComponent(name);
  
    const referencia = typeValue === 'multaAtraso' ? '20230151' : typeValue === 'segundaVia' ? '20230152' : '20230153';
    const valor = parseFloat(value.replace(/[^\d,.]/g, '').replace(',', '.')).toFixed(2);
    const competencia = new Date().toISOString().substr(0, 7);
    const vencimento = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
  
    const queryParams = {
      servico: '35',
      cpfCnpjContribuinte: cleanCPF,
      nomeContribuinte: encodedName,
      numeroReferencia: referencia,
      valorPrincipal: valor,
      competencia: competencia,
      vencimento: vencimento,
    };
  
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  
    const finalURL = `${baseURL}&${queryString}`;
  
    return finalURL;
  };
  
  
  
    

  {/* ------------------- GERANDO URL CUSTOMIZADA  FIM ----------------------------------------------------------------------- */}

 
  
{/* ------------------- FORMATANDO INPUT NOME PARA RECEBER APENAS LETRAS  ----------------------------------------------------------------------- */}
  const handleChangeName = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    setName(formattedValue);
  }



{/* ------------------- FORMATANDO INPUT DO VALOR EM REAIS BR  ----------------------------------------------------------------------- */}
  const formatCurrency = (input) => {
    const cleanValue = input.replace(/[^\d]/g, '');
    const formattedValue = Number(cleanValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formattedValue;
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(formatCurrency(inputValue));
  }


{/* ------------------- FORMATANDO INPUT DO CPF EM TEMPO REAL  ----------------------------------------------------------------------- */}

  const formatarCPF = (value) => {
    //remove numeros
    const cleanedValue = value.replace(/\D/g, '');
    
    //aplica os pontos e traços do cpf no input
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
    
    return cpfFormatted;
  };

  const handleChangeCPF = (event) => {
    const formattedValue = formatarCPF(event.target.value);
    setCPF(formattedValue);
  };

  {/* ------------------- VALIDANDO CPF E MOSTRANOD ERRO   ----------------------------------------------------------------------- */}
    const mostrarErroCPF = (mostrar) => {
      const divErroCPF = document.getElementById('erroCPF');
      if(divErroCPF) {
        divErroCPF.classList.toggle('hidden', !mostrar);
        divErroCPF.classList.toggle('block', mostrar);
      }
    }


  const validarCPF = () => {
    const cpfRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
    if (!cpfRegex.test(cpf)) {
      setErroCPF('CPF inválido');
      return false;
    }
    setErroCPF('');
    return true;
  }


  // Prevenir página de dar reload

  const handleSignupForm = (e) => {
    e.preventDefault();
    const formattedCpf = formatarCPF(cpf);
    const cpfValido = validarCPF();
    const formattedName = name; 
    const formattedValue = formatCurrency(value); // Formata o valor para a moeda

    let servico = '';
    if (typeValue === 'multaAtraso') {
      servico = 'multa_atraso';
    } else if (typeValue === 'segundaVia') {
      servico = 'segunda_via'; 
    } else {
      servico = 'ambos'; 
    }

    if (cpfValido) {
      let servico = '';
      if (typeValue === 'multaAtraso') {
        servico = '20230151';
      } else if (typeValue === 'segundaVia') {
        servico = '20230152'; 
      } else {
        servico = '20230153'; 
      }

      // Código para gerar o link...
      const url = generateURL(); // Chama a função para gerar a URL
      console.log('Link gerado:', url);
      setGeneratedLink(url); // Armazena o link gerado no estado
  
      setModalVisible(true); // Mostra o modal
      mostrarErroCPF(false);
      // tratar cpf inválido
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleEscolha = (event) => {
    setTypeValue(event.target.value);
  };


  return (
    <main className="   text-black bg-white min-h-screen flex-col items-center justify-between ">
      <div className="lg:text-xl font-body z-10  w-full items-center justify-between text-sm ">
    
        <div className='bg-azul-900 w-[100vw]'>
          <a href="https://portalufj.jatai.ufg.br">
          <h1 className="text-sm p-3 px-5 text-slate-300 tracking-widest	">Universidade Federal de Jatai</h1>
          </a>
        </div>
        
        <div >
          <Image src={faixa}  className=' w-[100vw] lg:h-[12vh] opacity-60' alt="" />
        </div>

        <form onSubmit={handleSignupForm} className=' relative lg:h-[90vh] md:items-center pt-[44px] pb-36 lg:px-5 px-44 flex flex-col gap-3  items-start'>
          <div className='xl:w-[67vw] lg:w-[90vw]  lg:pb-16'>
            <h1 className='lg:text-2xl text-lg  font-bold self'>Preencha seus dados</h1>
            <p>Preencha seus dados para prosseguir com o pagamento de GRU</p>
          </div>

          <div className='lg:flex lg:flex-row lg:gap-28 '>        
            <div className='flex flex-col gap-8 my-5 lg:my-0'>
              <label 
              className='lg:text-2xl text-lg  font-bold' 
              htmlFor=""
              >Selecione o tipo de pagamento</label>
              <label className=' flex flex-row gap-3 '  htmlFor="">
                {/* ------------------- RADIO MULTA ATRASO ----------------------------------------------------------------------- */}
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
                {/* ------------------- RADIO SEGUNDA VIA  ----------------------------------------------------------------------- */}

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
                {/* ------------------- RADIO AMBAS ESCOLHAS ----------------------------------------------------------------------- */}

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
{/* ------------------- INPUT CPF ----------------------------------------------------------------------- */}
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col '>
                <label className='font-bold' htmlFor="cpf">CPF ou CNPJ do Contribuinte</label>
                <input 
                className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneinvalid:border-pink-500 invalid:text-pink-60 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' 
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
{/* ------------------- INPUT NOME ----------------------------------------------------------------------- */}
              <div className='flex flex-col '>
                <label className='font-bold' htmlFor="nome">Nome completo do contribuinte</label>
                <input 
                  className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneinvalid:border-pink-500 invalid:text-pink-60 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' 
                  name="nome" 
                  type="text" 
                  id='nome'
                  placeholder="Nome completo" 
                  required
                  value={name}
                  onChange={handleChangeName}
                ></input> 
              </div>
{/* ------------------- INPUT VALOR ----------------------------------------------------------------------- */}
              
              <div className='flex flex-col '>
              <label  className='font-bold self-start' htmlFor="valor">Valor</label>
                <input 
                className='lg:w-[28.75rem] lg:text-xl mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneinvalid:border-pink-500 invalid:text-pink-60 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' 
                name="valor" 
                  type="text" 
                  placeholder="Valor" 
                  required
                  value={value}
                  onChange={handleChange}
                  maxLength={"15"}
                ></input>
              </div>
              <button className='self-center lg:self-start l\mt-5 w-36 h-8 rounded-full bg-azul-500  text-blue-50 font-medium hover:shadow-azul-200 hover:bg-blue-700 hover:ease-in-out cursor-pointer' type="submit">Gerar GRU</button>
            </div> 
          </div>
        </form>     
       
        <footer className='border-t-2 flex flex-col items-start md:flex-row md:justify-around py-5 text-base '>
          <div className='py-4 flex flex-col place-items-center'>
            <h3 className='font-bold pb-3 lg:self-start '>Contato </h3>
            <ul className='flex flex-col gap-3 items-center lg:items-start'>
              <li className='font-medium pt-5' >Biblioteca Flor-do-Cerrado</li>
              <li className=''>(64)3606-8260</li>
              <li>(64)3606-8261</li>
              <li className='font-medium pt-5'>Biblioteca Binômino da Costa Lima</li>
              <li>(64)3606-8380</li>
            </ul>          
          </div>
          <div className='py-4 flex flex-col place-items-center'>
            <h3 className='font-bold pb-3 lg:self-start '>Horários de funcionamento</h3>
            <ul className='flex flex-col gap-3 items-center lg:items-start'>
              <li className='font-medium pt-5'>Biblioteca Flor-do-Cerrado </li>
              <li> Segunda à sexta das <span className='font-medium'>7h15 às 21h</span></li>
              <li className='font- pt-5'> Biblioteca Binômino da Costa Lima</li>
              <li> segunda à sexta das <span className='font-medium'>8h às 20h</span></li>
            </ul>
          </div>
        </footer>
{/* ------------------- MODAL   ----------------------------------------------------------------------- */}
        {modalVisible &&(
          <div className=' m-auto top-0 left-0 bottom-0 right-0 absolute bg-slate-900 bg-opacity-25 w-[100vw] h-[100vw]'>
            <div className='flex flex-col  items-center rounded-xl  justify-center m-auto top-0 left-0 bottom-0 right-0 absolute bg-slate-50 w-[60vw] h-[30vh] shadow-2xl shadow-slate-300 '>
               <button onClick={handleCloseModal} className='self-end px-5 font-bold text-2xl hover:text-gray-500'>
                 X
                </button>
            <div className='flex flex-col rounded-full '>
                <h3 className='lg:text-2xl text-lg  font-bold self '>Link do GRU gerado com sucesso </h3>
                <p>Clique no botão criado à seguir para prosseguir</p>
                <a href={generatedLink} className=' rounded-full bg-azul-500  text-blue-50 font-bold py-2 my-5 text-center shadow-md hover:shadow-azul-200 hover:bg-blue-700 hover:ease-in-out cursor-pointer '>
                Ir para o Pagamento
                </a>
             </div>
            </div>
          </div>
        )}
{/* ------------------- MODAL  FIM ----------------------------------------------------------------------- */}

      </div>
    </main>
  )
}
