'use client'
import { useQuery } from "@tanstack/react-query"
import { WorkspaceRepository } from "../../infrastructure/repositories/workspace.repository"
import { WorkspaceDataSource } from "../../infrastructure/datasources/workspace.data-source"
import { useSession } from "next-auth/react"

export default function useWorkspaceHook(workspaceDataSource: WorkspaceDataSource) {
    const { data: dataSession } = useSession()
    const userId = dataSession?.user?.id || ''
    const workspaceRepository = new WorkspaceRepository(workspaceDataSource)
    const getWorkspaces = useQuery({
        queryKey: ['workspacesByUserId'],
        queryFn: async () => await workspaceRepository.getWorkspacesByUserId(parseInt(userId)),
        enabled: !!userId && userId != '',
    })
    return {
        getWorkspaces
    }
}