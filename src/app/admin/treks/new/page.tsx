import TrekForm from '@/components/TrekForm';

export default function NewTrekPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Create New Trek</h1>
            <TrekForm />
        </div>
    );
}
