import { requireAuth } from '@/app/api/auth';
import DashboardCustomersPage from './customers/page';
import DashboardAdminPage from './admin/page';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {

    const { user } = await requireAuth();

    if (!user) {
        redirect('/signin');
    }

    if (user.role === 'ADMIN') {
        return <DashboardAdminPage user={user} />;
    }

    return <DashboardCustomersPage user={user}/>
}
export default DashboardPage