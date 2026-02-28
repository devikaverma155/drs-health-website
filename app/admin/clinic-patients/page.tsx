import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ClinicPatientsPage() {
  const patients = await prisma.clinicPatient.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Clinic Patients</h1>
        <Link
          href="/admin/clinic-patients/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Patient
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {patients.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No patients yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Age</th>
                <th className="px-4 py-3 font-medium">Condition</th>
                <th className="px-4 py-3 font-medium">Doctor</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/clinic-patients/${patient.id}`} className="font-medium text-primary hover:underline">
                      {patient.name || '-'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{patient.phone || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{patient.email || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{patient.age || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{patient.condition || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{patient.assignedDoctor || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(patient.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/clinic-patients/${patient.id}`} className="text-sm text-primary hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
