import { requireAuth } from "@/app/api/auth";
import DashboardAdminPage from "./admin/page";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/loading/loading";

const DashboardPage = async () => {
    const session = await requireAuth();

    if (!session?.user) {
        redirect("/signin");
    }

    return (
        <Suspense fallback={<Loading />}>
            <DashboardAdminPage user={session.user} />
        </Suspense>
    );
};
export default DashboardPage;
