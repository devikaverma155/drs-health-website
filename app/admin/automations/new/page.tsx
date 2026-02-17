import { AutomationRuleForm } from '../AutomationRuleForm';

export default function NewAutomationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">New automation rule</h1>
      <AutomationRuleForm />
    </div>
  );
}
