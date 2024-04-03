import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function CategoriesIndex({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Categorías
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 text-white">You're logged in!</div>
        </AuthenticatedLayout>
    );
}
