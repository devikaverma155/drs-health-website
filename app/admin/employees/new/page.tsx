import Link from 'next/link';
import { EmployeeForm } from '../EmployeeForm';

export default function NewEmployeePage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/employees" className="text-sm text-slate-500 hover:text-slate-900">
        ← Employees
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Employee</h1>
      <EmployeeForm />
    </div>
  );
}
