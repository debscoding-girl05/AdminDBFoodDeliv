import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Access the sidebar state
  const { isOpen, setIsOpen } = useSidebarToggle((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }));

  if (isOpen === undefined) {
    // This condition should not trigger if Zustand is working properly
    console.error("isOpen is undefined");
  }

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
