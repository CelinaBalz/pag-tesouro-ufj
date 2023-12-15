export default function Footer() {
    return(
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
    )
}