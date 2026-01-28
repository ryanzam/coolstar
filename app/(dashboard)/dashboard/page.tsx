import { requireAuth } from '@/app/api/auth';
import DashboardCustomersPage from './customers/page';
import DashboardAdminPage from './admin/page';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/components/loading/loading';

const DashboardPage = async () => {

    const session = await requireAuth();

    if (!session?.user) {
        redirect('/signin');
    }

    if (session.user.role === 'ADMIN') {
        return <Suspense fallback={<Loading />}>
            <DashboardAdminPage user={session.user} />
        </Suspense>;
    }

    return <Suspense fallback={<Loading />}>
        <DashboardCustomersPage />
    </Suspense>
}
export default DashboardPage