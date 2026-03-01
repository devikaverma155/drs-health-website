import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { EmployeeForm } from '../EmployeeForm';
import { deleteEmployee } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { FileSection } from './FileSection';

export const dynamic = 'force-dynamic';

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      documents: { orderBy: { uploadedAt: 'desc' } },
    },
  });

  if (!employee) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/employees" className="text-sm text-slate-500 hover:text-slate-900">
          ← Employees
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Employee</h1>
            <EmployeeForm employee={employee} />
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <FileSection employeeId={employee.id} documents={employee.documents} />
            <div className="mt-6 pt-6 border-t border-slate-200">
              <DeleteButton
                action={deleteEmployee.bind(null, employee.id)}
                label="Delete Employee"
                redirectPath="/admin/employees"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
