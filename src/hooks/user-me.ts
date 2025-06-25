import http from "@/core/http"
import { useQuery } from "@tanstack/react-query"

export default function useUserMeHook() {
    const { data: user } = useQuery({
        queryKey: ['userMe'],
        queryFn: async () => await http.get('auth/userMe')
    })
    return { 
        user
    }
}