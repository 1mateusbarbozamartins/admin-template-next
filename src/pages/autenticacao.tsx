 
import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";

export default function Autenticacao() {

    const { login, cadastrar, loginGoogle } = useAuth()
    
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState<string | null>(null)

    function exibirErro(msg: string, tempoEmSegundos = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempoEmSegundos * 1000)
    }

    async function submeter() {
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }
        } catch (e) {
            const erro = e as Error;
            exibirErro(erro.message ?? 'Erro desconhecido!');
        }
    }   

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="m-10 w-1/2">
                <h1 className={`
                    text-3xl font-bold mb-5  
                `}>
                    {
                        modo === 'login'? 
                        'Entre com a Sua Conta' : 
                        'Cadastre-se na Plataforma'
                    }
                </h1>

                {erro ? (
                    <div className={`
                            flex gap-3 items-center
                            bg-red-400 text-white py-3 px-5 my-2
                            border border-red-700 rounded-lg
                        `}>
                            {IconeAtencao()}
                            <span>{erro}</span>
                    </div>
                ): false}

                <AuthInput 
                    label="Email"
                    valor={email}
                    obrigatorio
                    tipo="email"
                    valorMudou={setEmail}
                />
                <AuthInput 
                    label="Senha"
                    valor={senha}
                    obrigatorio
                    tipo="password"
                    valorMudou={setSenha}
                />

                <button 
                    onClick={submeter}
                    className={`
                        w-full bg-indigo-500 hover:bg-indigo-400
                        text-white rounded-lg px-4 py-3 mt-6
                    `}
                >
                    {
                        modo === 'login'? 
                        'Entrar' : 
                        'Cadastrar'
                    }
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button 
                    onClick={loginGoogle}
                    className={`
                        w-full bg-red-500 hover:bg-red-400
                        text-white rounded-lg px-4 py-3
                    `}
                >
                    Entrar com Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`
                                text-blue-500 hover:text-blue-700 font-semibold
                                cursor-pointer ml-1
                            `}>
                            Crie uma conta
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já tem conta?
                        <a onClick={() => setModo('login')} className={`
                                text-blue-500 hover:text-blue-700 font-semibold
                                cursor-pointer ml-1
                            `}>
                            Entre com suas credenciais
                        </a>
                    </p>
                )} 
            </div>
        </div>
    )
}