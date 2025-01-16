import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const userUserRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userRole, isLoading: isUserRoleLoading} = useQuery({
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user?.email}`);
            return res.data?.role;
        }
    });

    return {userRole, isUserRoleLoading};
};

export default userUserRole;