"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSavedRepo } from "@/lib/config";

export function RepoGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/setup") {
      setReady(true);
      return;
    }
    const repo = getSavedRepo();
    if (!repo) {
      router.replace("/setup");
    } else {
      setReady(true);
    }
  }, [pathname]);

  if (!ready) return null;
  return <>{children}</>;
}