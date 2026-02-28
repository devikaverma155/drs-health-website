import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EmployeesPage() {
  const [employees, docCountRows] = await Promise.all([
    prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.employeeDocument.groupBy({
      by: ['employeeId'],
      _count: { id: true },
      where: { employeeId: { not: null } },
    }),
  ]);

  const docCountByEmployee = new Map<string, number>();
  for (const row of docCountRows) {
    if (row.employeeId) docCountByEmployee.set(row.employeeId, row._count.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Employees</h1>
        <Link
          href="/admin/employees/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Employee
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {employees.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No employees yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Designation</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Documents</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/employees/${employee.id}`} className="font-medium text-primary hover:underline">
                      {employee.name || '-'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{employee.email || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{employee.phone || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{employee.designation || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{employee.department || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{docCountByEmployee.get(employee.id) ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      employee.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {employee.status || 'active'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/employees/${employee.id}`} className="text-sm text-primary hover:underline">
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
