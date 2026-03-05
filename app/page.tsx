"use client";

import { DependencyGraph } from "@/components/graph/DependencyGraph";

export default function TestPage() {
  return (
    <div className="p-6 h-screen">
      <DependencyGraph
        rootId="validate_user"
        nodes={[
          { id: "validate_user",    label: "validate_user",    filepath: "src/auth.py",         type: "root"     },
          { id: "login",            label: "login",            filepath: "src/auth.py",         type: "direct"   },
          { id: "authenticate",     label: "authenticate",     filepath: "middleware.py",        type: "direct"   },
          { id: "refresh_token",    label: "refresh_token",    filepath: "src/auth.py",         type: "direct"   },
          { id: "protected_route",  label: "protected_route",  filepath: "api/routes.py",        type: "indirect" },
          { id: "admin_only",       label: "admin_only",       filepath: "api/routes.py",        type: "indirect" },
          { id: "get_current_user", label: "get_current_user", filepath: "src/users.py",         type: "indirect" },
          { id: "jwt.decode",       label: "jwt.decode",       filepath: "lib/jwt.py",           type: "callee"   },
          { id: "cache.get",        label: "cache.get",        filepath: "lib/cache.py",         type: "callee"   },
          { id: "cache.set",        label: "cache.set",        filepath: "lib/cache.py",         type: "callee"   },
        ]}
        edges={[
          { source: "validate_user",    target: "jwt.decode",       animated: true  },
          { source: "validate_user",    target: "cache.get",        animated: true  },
          { source: "validate_user",    target: "cache.set",        animated: true  },
          { source: "login",            target: "validate_user",    animated: true  },
          { source: "authenticate",     target: "validate_user",    animated: true  },
          { source: "refresh_token",    target: "validate_user",    animated: true  },
          { source: "protected_route",  target: "authenticate",     animated: true  },
          { source: "admin_only",       target: "authenticate",     animated: true  },
          { source: "get_current_user", target: "validate_user",    animated: true  },
        ]}
        onNodeClick={(node) => console.log("clicked", node.id)}
      />
    </div>
  );
}