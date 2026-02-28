import Link from 'next/link';
import { ClinicPatientForm } from '../ClinicPatientForm';

export default function NewClinicPatientPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/clinic-patients" className="text-sm text-slate-500 hover:text-slate-900">
        ← Clinic Patients
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Patient</h1>
      <ClinicPatientForm />
    </div>
  );
}
