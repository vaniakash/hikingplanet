import { notFound } from 'next/navigation';
import TrekForm from '@/components/TrekForm';
import dbConnect from '@/lib/db';
import Trek from '@/models/Trek';

import TrekDates from '@/components/TrekDates';

export default async function EditTrekPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    await dbConnect();
    const trek = await Trek.findById(params.id).lean();

    if (!trek) {
        notFound();
    }

    // Serialize strict object for client component (Mongoose document to POJO conversion if needed, .lean() handles most)
    const serializedTrek = JSON.parse(JSON.stringify(trek));

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Trek</h1>
            <TrekForm initialData={serializedTrek} />

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <TrekDates trekId={serializedTrek._id} />
        </div>
    );
}
