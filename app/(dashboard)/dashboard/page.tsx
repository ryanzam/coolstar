import { requireAuth } from '@/app/api/auth';
import DashboardCustomersPage from './customers/page';
import DashboardAdminPage from './admin/page';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {

    const session = await requireAuth();

    if (!session?.user) {
        redirect('/signin');
    }

    if (session.user.role === 'ADMIN') {
        return <DashboardAdminPage user={session.user} />;
    }

    return <DashboardCustomersPage />
}
export default DashboardPage