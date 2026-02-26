import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ClinicPatientForm } from '../ClinicPatientForm';
import { deleteClinicPatient } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ClinicPatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await prisma.clinicPatient.findUnique({
    where: { id },
  });

  if (!patient) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clinic-patients" className="text-sm text-slate-500 hover:text-slate-900">
          ← Clinic Patients
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Patient</h1>
        <ClinicPatientForm patient={patient} />
        <div className="mt-6 pt-6 border-t border-slate-200">
          <DeleteButton
            action={deleteClinicPatient.bind(null, patient.id)}
            label="Delete Patient"
            redirectPath="/admin/clinic-patients"
          />
        </div>
      </div>
    </div>
  );
}
