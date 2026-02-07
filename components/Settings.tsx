interface SettingsCardProps {
  title: string
  description: string
  children: React.ReactNode
}

const SettingsCard = ({ title, description, children }: SettingsCardProps) => (
  <div className="bg-white shadow-sm rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-clarte-gray-900">{title}</h3>
      <p className="mt-1 max-w-2xl text-sm text-clarte-gray-500">{description}</p>
    </div>
    <div className="border-t border-clarte-gray-200 px-4 py-5 sm:p-6">{children}</div>
  </div>
);

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <SettingsCard
        title="Carrier Rules"
        description="Configure special handling for specific insurance companies."
      >
        <div className="space-y-4">
          <p className="text-sm text-clarte-gray-700">No rules configured yet.</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-clarte-orange-600 hover:bg-clarte-orange-500">
            Add New Rule
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Auto-Flagging Rules"
        description="Automatically mark certain claims for review based on criteria."
      >
         <div className="space-y-4">
            <div className="flex items-center">
                <input id="auto-flag-denied" name="auto-flag-denied" type="checkbox" className="h-4 w-4 text-clarte-orange-600 border-clarte-gray-300 rounded" defaultChecked/>
                <label htmlFor="auto-flag-denied" className="ml-3 block text-sm font-medium text-clarte-gray-700">Flag all 'Denied' claims</label>
            </div>
            <div className="flex items-center">
                <input id="auto-flag-high-value" name="auto-flag-high-value" type="checkbox" className="h-4 w-4 text-clarte-orange-600 border-clarte-gray-300 rounded"/>
                <label htmlFor="auto-flag-high-value" className="ml-3 block text-sm font-medium text-clarte-gray-700">Flag claims over $1,000</label>
            </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Office & User Management"
        description="Manage offices and invite team members."
      >
        <div>
          <h4 className="font-medium text-clarte-gray-800 mb-2">Users</h4>
          <ul className="divide-y divide-clarte-gray-200">
            <li className="py-3 flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-clarte-gray-900">Dr. Kelvin (You)</p>
                    <p className="text-sm text-clarte-gray-500">owner@maindental.com</p>
                </div>
                <span className="text-sm font-medium text-clarte-gray-500">Admin</span>
            </li>
            <li className="py-3 flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-clarte-gray-900">Alice Manager</p>
                    <p className="text-sm text-clarte-gray-500">alice@maindental.com</p>
                </div>
                 <span className="text-sm font-medium text-clarte-gray-500">Staff</span>
            </li>
          </ul>
           <button className="mt-4 inline-flex items-center px-4 py-2 border border-clarte-gray-300 text-sm font-medium rounded-md shadow-sm text-clarte-gray-700 bg-white hover:bg-clarte-gray-50">
            Invite User
          </button>
        </div>
      </SettingsCard>
    </div>
  );
};

export default Settings;
