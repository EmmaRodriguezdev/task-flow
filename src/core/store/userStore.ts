'use client'
import { create } from 'zustand';
import { IUser } from '../types/next-auth';
import useUserMeHook from '@/hooks/user-me';import { useEffect } from 'react';
 '../../hooks/user-me'

type Store = {
    user: IUser | null,
    setUser: (user: IUser) => void
}

export const useStore = create<Store>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user }))
}))

export default function userMe() {
    const { setUser } = useStore()
    const { user: dataUser } = useUserMeHook()
    useEffect(() => {
        if (dataUser) {
          setUser(dataUser as IUser)
        }
      }, [dataUser, setUser])
}

