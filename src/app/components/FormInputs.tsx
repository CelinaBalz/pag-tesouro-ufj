import React from "react";
import { useState } from 'react'

import InputCPF, { formatarCPF } from './InputCPF'
import InputNome from './InputNome'
import InputValor from './InputValor'
import InputRadio from './InputRadio'
import Modal from "./Modal";

export const FormInputs = () => {
    const [cpf, setCPF] = useState('')
    const [erroCPF, setErroCPF] = useState('')
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [typeValue, setTypeValue] = useState('multaAtraso')
    const [modalVisible, setModalVisible] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    
  
    
  {/* ------------------- Event handlers  ----------------------------------------------------------------------- */}
    const handleChangeName = (event) => {
      const inputValue = event.target.value;
      const formattedValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
      setName(formattedValue);
    }
    const handleEscolha = (event) => {
        setTypeValue(event.target.value);
      };
    const handleChange = (event) => {
      const inputValue = event.target.value;
      setValue(formatCurrency(inputValue));
    }
    const handleChangeCPF = (event) => {
      const formattedValue = formatarCPF(event.target.value);
      setCPF(formattedValue);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
      };


  
// Formatando Input de valor em R$   
    const formatCurrency = (input) => {
      const cleanValue = input.replace(/[^\d]/g, '');
      const formattedValue = Number(cleanValue / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
  
      return formattedValue;
    };
  

// Validando CPF 

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
          mostrarErroCPF(true); 
          return false;
        }
        setErroCPF('');
        mostrarErroCPF(false); 
        return true;
      };
      
 
//    Gerando a url  

   const generateURL = () => {
    const baseURL = 'https://pagtesouro.tesouro.gov.br/portal-gru/#/pagamento-gru/formulario?servico=014423%3Fservico%3D35&jurosEncargos=0%3Fservico%3D35&moraMulta=0%3Fservico%3D35&descontosAbatimentos=0%3Fservico%3D35';
    const cleanCPF = cpf.replace(/\D/g, ''); 
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

      // gerando link
      const url = generateURL(); 
      console.log('Link gerado:', url);
      setGeneratedLink(url); 
      setModalVisible(true); 
      mostrarErroCPF(false);
    }
  };
  
return(
    <div>
    <form onSubmit={handleSignupForm} className=' relative lg:h-[90vh] md:items-center pt-[44px] pb-36 lg:px-5 px-44 flex flex-col gap-3  items-start'>
    <div className='xl:w-[67vw] lg:w-[90vw]  lg:pb-16'>
      <h1 className='lg:text-2xl text-lg  font-bold self'>Preencha seus dados</h1>
      <p>Preencha seus dados para prosseguir com o pagamento de GRU</p>
    </div>
    <div className='lg:flex lg:flex-row lg:gap-28 '>        
      <InputRadio typeValue={typeValue} handleEscolha={handleEscolha} ></InputRadio>
      <div className='flex flex-col gap-10'>
      <InputCPF cpf={cpf} handleChangeCPF={handleChangeCPF}></InputCPF>                    
      <InputNome name={name} handleChangeName={handleChangeName} ></InputNome>
      <InputValor value={value} handleChange={handleChange} />    
      <button className='self-center lg:self-start l\mt-5 w-36 h-8 rounded-full bg-azul-500  text-blue-50 font-medium hover:shadow-azul-200 hover:bg-blue-700 hover:ease-in-out cursor-pointer' type="submit">Gerar GRU</button>
    </div> 
    </div>
  </form> 
          <Modal isVisible={modalVisible} handleCloseModal={() => setModalVisible(false)} generatedLink={generatedLink} />     
    </div>
)
}

export default FormInputs