"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FaLine, FaProjectDiagram } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp, LogOut, User2 } from "lucide-react";
import useWorkspaceHook from "@/modules/workspace/presentation/hooks/workspace.hook";
import { WorkspaceDataSource } from "@/modules/workspace/infrastructure/datasources/workspace.data-source";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { setWorkspace } from "@/modules/workspace/state/workspace.slice";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

type SidebarItem = {
  title: string;
  url: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon: any;
};

export function AppSidebar() {
  const [hasMounted, setHasMounted] = useState(false);
  const { data: session } = useSession();
  const workspaceDataSource = new WorkspaceDataSource();
  const {
    getWorkspaces,
    dispatch,
    workspace: wks,
  } = useWorkspaceHook(workspaceDataSource);
  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      url: "/panel/dashboard",
      icon: MdDashboard,
    },
    {
      title: "Timeline",
      url: "/panel/timeline",
      icon: FaLine,
    },
    {
      title: "Board",
      url: "/panel/board",
      icon: FaProjectDiagram,
    },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    hasMounted && (
      <Sidebar className="border-r border-gray-700 pt-4 bg-blue-dark">
        <SidebarHeader className="bg-blue-dark text-white">
          <SidebarMenu className="rounded-lg">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Select Workspace
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto">
                  {getWorkspaces.data?.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onClick={() =>
                        dispatch(
                          setWorkspace({
                            id: workspace.id,
                            name: workspace.name,
                          })
                        )
                      }
                      className={cn(
                        workspace.id === wks?.id && "bg-yellow-light text-black"
                      )}
                    >
                      <span> {workspace.name} </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-blue-dark text-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-yellow text-[20px] tracking-wide font-bold truncate">
              {wks?.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-[10px] p-[20px_10px]">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-blue-medium hover:text-white"
                    >
                      <Link
                        href={item.url}
                        className="text-[18px] font-semibold"
                      >
                        {item.icon && <item.icon />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-blue-dark ">
          <SidebarMenu className="bg-blue-dark text-white">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />{" "}
                    {session?.user?.name + " " + session?.user?.lastName ||
                      "User"}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  >
                    <span className="flex items-center">
                      Sign out <LogOut className="ml-2" />{" "}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  );
}
