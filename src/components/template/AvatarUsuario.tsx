import useAuth from "@/data/hook/useAuth"
import Link from "next/link"

interface AvatarUsuarioProps {
    className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth()
    return (
        <Link href="/perfil">
            <img 
                src={usuario?.imagemUrl ?? '/images/avatar.svg'} 
                alt="" 
                className={`
                    h-8 w-8 rounded-full cursor-pointer bg-white 
                    ${props.className} ${usuario ?? 'px-2 py-2 ml-2'} 
                    `}
            />
        </Link>
    )   
}