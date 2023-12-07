
export default function Home() {
  return (
    <main className="flex text-black bg-white min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1>Universidade Federal de Jatai</h1>
        </div>
        
        <form>
          <h1>Preencha seus dados</h1>
          
          <div>
            <label htmlFor="">Selecione o tipo de pagamento</label>
            <input name="tipopag" type="radio"  required></input>
            <input name="tipopag" type="radio"  required></input>
            <input name="tipopag" type="radio"  required></input>
          </div>
         
          <div>
            <label htmlFor="cpf">CPF ou CNPJ do Contribuinte</label>
            <input name="cpf" type="text" placeholder="CPF completo" required></input>      
          </div>
         
          <div>
            <label htmlFor="nome">Nome completo do contribuinte</label>
            <input name="nome" type="text" placeholder="Nome completo" required></input> 
          </div>
         
          <div>
           <label htmlFor="valor">Valor</label>
            <input name="valor" type="number" placeholder="Valor" required></input>
          </div>      
        
          <button type="submit">Enviar</button>
        </form>
        <footer>
          
        </footer>
      </div>
    </main>
  )
}
