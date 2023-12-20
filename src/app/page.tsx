'use client'

import { useState } from 'react'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from './components/Modal'
import InputCPF, { formatarCPF } from './components/InputCPF'
import InputNome from './components/InputNome'
import InputValor from './components/InputValor'


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
        mostrarErroCPF(true); // Chamar a função para mostrar o erro
        return false;
      }
      setErroCPF('');
      mostrarErroCPF(false); // Se for válido, esconde o erro
      return true;
    };
    


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

        <Header></Header>

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
            <div className='flex flex-col gap-10'>
              <InputCPF cpf={cpf} handleChangeCPF={handleChangeCPF}></InputCPF>                    
              <InputNome name={name} handleChangeName={handleChangeName} ></InputNome>
              <InputValor value={value} handleChange={handleChange} />    
              <button className='self-center lg:self-start l\mt-5 w-36 h-8 rounded-full bg-azul-500  text-blue-50 font-medium hover:shadow-azul-200 hover:bg-blue-700 hover:ease-in-out cursor-pointer' type="submit">Gerar GRU</button>
            </div> 
          </div>
        </form>     
        <Footer></Footer>
        <Modal isVisible={modalVisible} handleCloseModal={handleCloseModal} generatedLink={generatedLink} />     
      </div>
    </main>
  )
}
