"use client";

import * as React from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/atoms/button";
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
        <p className="px-2 text-sm leading-relaxed text-sidebar-foreground/70">
          Plan your year and spot the best moments for time off.
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 pb-1 text-[0.7rem] font-semibold tracking-[0.08em] text-sidebar-foreground/60 uppercase">
            Year
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <div className="flex items-center justify-between rounded-md bg-sidebar-accent px-1.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous year"
                  className="size-7 text-sidebar-foreground hover:bg-sidebar"
                  onClick={() => setYear(year - 1)}
                >
                  <CaretLeftIcon />
                </Button>
                <span
                  aria-label={`Selected year: ${year}`}
                  className="inline-flex h-10 min-w-16 font-sans items-center justify-center rounded-md bg-transparent px-2 text-sm font-semibold tabular-nums text-sidebar-foreground"
                >
                  {year}
                </span>
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
