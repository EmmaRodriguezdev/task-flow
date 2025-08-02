'use client'
import { useQuery } from "@tanstack/react-query"
import { WorkspaceRepository } from "../../infrastructure/repositories/workspace.repository"
import { WorkspaceDataSource } from "../../infrastructure/datasources/workspace.data-source"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/core/store/store"
import { fetchWorkspacesByUserId } from "../../state/workspace.slice"
import { useEffect } from "react"

export default function useWorkspaceHook(workspaceDataSource: WorkspaceDataSource) {
    const { data: dataSession } = useSession()
    const userId = dataSession?.user?.id || ''
    const workspace = useSelector((state: RootState) => state.workspace.workspaceSelected)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (userId) {
            dispatch(fetchWorkspacesByUserId(parseInt(userId)))
        }
    }, [userId, dispatch])

    const workspaceRepository = new WorkspaceRepository(workspaceDataSource)
    const getWorkspaces = useQuery({
        queryKey: ['workspacesByUserId'],
        queryFn: async () => await workspaceRepository.getWorkspacesByUserId(parseInt(userId)),
        enabled: !!userId && userId != '',
    })
    return {
        getWorkspaces,
        dispatch,
        workspace
    }
}