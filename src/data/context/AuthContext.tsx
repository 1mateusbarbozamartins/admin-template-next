/* eslint-disable @typescript-eslint/no-unused-vars */

import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { auth, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../firebase/config'
import Usuario from '@/model/Usuario'
import Cookies from 'js-cookie'

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
});


async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL,
    }
}

function gerenciarCookie(logado: boolean) {
    if(logado) {
        Cookies.set('admin-template-cod3r-auth', logado, {
            expires: 7
        });
    } else {
        Cookies.remove('admin-template-cod3r-auth');
    }
}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    async function configurarSessao(usuarioFirebase) {
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
        const resp = await signInWithPopup(auth, new GoogleAuthProvider());

        await configurarSessao(resp.user)
        route.push('/');
    }

    async function login(email, senha) {
        // const resp = await signInWithEmailAndPassword(auth, email, senha);

        // await configurarSessao(resp.user)
        route.push('/');
    }

    async function cadastrar(email, senha) {
        // const resp = await createUserWithEmailAndPassword(auth, email, senha);

        // await configurarSessao(resp.user)
        route.push('/');
    }

    async function logout() {
        try {
            setCarregando(true)
            await signOut(auth);
            await configurarSessao(null);
            route.push('/autenticacao');
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-cod3r-auth')) {
            const cancelar = onIdTokenChanged(auth, configurarSessao); 
            return () => cancelar()
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