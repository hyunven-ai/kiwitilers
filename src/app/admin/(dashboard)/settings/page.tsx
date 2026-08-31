import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">General Settings</h2>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Site Name</label>
            <input type="text" defaultValue="KiwiTilers" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Admin Email</label>
            <input type="email" defaultValue="admin@kiwitilers.co.nz" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white" />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-sm text-slate-500 mb-4">Once you delete your account data, there is no going back. Please be certain.</p>
        <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">Delete All Data</Button>
      </div>
    </div>
  );
}
