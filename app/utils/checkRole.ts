export default async function checkUserRole(email: string) {
    try {
        const response = await fetch("/api/auth/check-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.role === "both") {
            return "both";
        } else if (data.role === "admin") {
            return "admin";
        } else if (data.role === "employee") {
            return "employee";
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error checking role:", error);
        return null;
    }
};
