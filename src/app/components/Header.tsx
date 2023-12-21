import Image from 'next/image'
import faixa from '../../../public/assets/faixa.png'

export default function Header() {
    return (
        <div className='bg-azul-900 w-[100vw]'>
        <a href="https://portalufj.jatai.ufg.br">
        <h1 className="text-sm p-3 px-5 text-slate-300 tracking-widest	">Universidade Federal de Jatai</h1>
        </a>
        <div >
        <Image src={faixa}   className=' w-[100vw] lg:h-[12vh] opacity-60' priority={true}  alt="" />
        </div>
      </div>
    )
}