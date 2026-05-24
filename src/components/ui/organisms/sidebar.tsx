"use client";

import * as React from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { useCalendar } from "@/components/ui/providers/calendar-provider";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/atoms/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { year, setYear } = useCalendar();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <h1 className="font-heading px-2 py-1 text-xl font-semibold tracking-tight text-sidebar-foreground">
          Cal
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Year</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <div className="flex items-center justify-between rounded-md bg-sidebar-accent px-2 py-1.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous year"
                  className="size-7 text-sidebar-foreground hover:bg-sidebar"
                  onClick={() => setYear(year - 1)}
                >
                  <CaretLeftIcon />
                </Button>
                <Input
                  value={year}
                  readOnly
                  aria-label="Selected year"
                  className="h-7 w-16 border-transparent bg-transparent text-center text-sm font-medium tabular-nums text-sidebar-foreground focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next year"
                  className="size-7 text-sidebar-foreground hover:bg-sidebar"
                  onClick={() => setYear(year + 1)}
                >
                  <CaretRightIcon />
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
