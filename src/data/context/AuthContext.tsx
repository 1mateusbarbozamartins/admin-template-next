/* eslint-disable @typescript-eslint/no-unused-vars */

import route from 'next/router'
import { createContext, useEffect, useState, ReactNode } from 'react'
import { auth, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../firebase/config'
import Usuario from '@/model/Usuario'
import Cookies from 'js-cookie'
import { User } from "firebase/auth"; 

interface AuthContextProps {
    usuario: Usuario | null;
    carregando?: boolean
    loginGoogle: () => void;
    login: (email: string, senha: string) => void;
    cadastrar: (email: string, senha: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    usuario: null,
    loginGoogle: () => {},
    login: async () => {},
    cadastrar: async () => {},
    logout: async () => {}
  });
  


async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName ?? '',
        email: usuarioFirebase.email ?? '',
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL ?? '',
    }
}

function gerenciarCookie(logado: boolean) {
    if(logado) {
        Cookies.set('admin-template-cod3r-auth', String(logado), {
            expires: 7
        });
    } else {
        Cookies.remove('admin-template-cod3r-auth');
    }
}

export function AuthProvider(props: { children: ReactNode }) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    async function configurarSessao(usuarioFirebase: User | null) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase);
            setUsuario(usuario);
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null);
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        // const resp = await signInWithPopup(auth, new GoogleAuthProvider());

        // await configurarSessao(resp.user)
        route.push('/');
    }

    async function login(email: string, senha: string) {
        // const resp = await signInWithEmailAndPassword(auth, email, senha);

        // await configurarSessao(resp.user)
        route.push('/');
    }

    async function cadastrar(email: string, senha: string) {
        // const resp = await createUserWithEmailAndPassword(auth, email, senha);

        // await configurarSessao(resp.user)
        route.push('/');
    }

    async function logout() {
        try {
            setCarregando(true)
            // await signOut(auth);
            await configurarSessao(null);
            route.push('/autenticacao');
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-cod3r-auth')) {
            // const cancelar = onIdTokenChanged(auth, configurarSessao); 
            // return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                usuario,
                carregando,
                cadastrar,
                login,
                loginGoogle,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}


export default AuthContext