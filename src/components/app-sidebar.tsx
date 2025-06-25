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
import { MdSettings } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import useWorkspaceHook from "@/modules/workspace/presentation/hooks/workspace.hook";
import { WorkspaceDataSource } from "@/modules/workspace/infrastructure/datasources/workspace.data-source";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

type SidebarItem = {
  title: string;
  url: string;
  icon: any;
};

export function AppSidebar() {
  const workspaceDataSource = new WorkspaceDataSource();
  const { getWorkspaces } = useWorkspaceHook(workspaceDataSource);
  const items: SidebarItem[] = [
    {
      title: "Timeline",
      url: "",
      icon: FaLine,
    },
    {
      title: "Board",
      url: "/panel/board",
      icon: FaProjectDiagram,
    },
    {
      title: "Settings",
      url: "",
      icon: MdSettings,
    },
  ];
  return (
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
                  <DropdownMenuItem key={workspace.id}>
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
          <SidebarGroupLabel className="text-yellow text-[16px] tracking-wide font-bold">
            TASKFLOW
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-[10px]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="m-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-base text-sidebar-foreground"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
