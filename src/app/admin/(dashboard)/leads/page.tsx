import { Button } from "@/components/ui/button";

export default function LeadsPage() {
  const leads = [
    { id: "1024", name: "John Smith", email: "john@example.com", service: "Bathroom Tiling", status: "New", date: "2026-08-31" },
    { id: "1025", name: "Sarah Wilson", email: "sarah@example.com", service: "Kitchen Tiling", status: "Contacted", date: "2026-08-31" },
    { id: "1026", name: "Michael Brown", email: "mike@example.com", service: "Floor Tiling", status: "Quoted", date: "2026-08-30" },
    { id: "1027", name: "Emma Davis", email: "emma@example.com", service: "Outdoor Tiling", status: "Approved", date: "2026-08-29" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Export CSV</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium border-b border-slate-100">ID</th>
                <th className="p-4 font-medium border-b border-slate-100">Customer</th>
                <th className="p-4 font-medium border-b border-slate-100">Contact</th>
                <th className="p-4 font-medium border-b border-slate-100">Service</th>
                <th className="p-4 font-medium border-b border-slate-100">Date</th>
                <th className="p-4 font-medium border-b border-slate-100">Status</th>
                <th className="p-4 font-medium border-b border-slate-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
                  <td className="p-4 text-sm text-slate-500">#{lead.id}</td>
                  <td className="p-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="p-4 text-sm text-slate-600">{lead.email}</td>
                  <td className="p-4 text-sm text-slate-600">{lead.service}</td>
                  <td className="p-4 text-sm text-slate-500">{lead.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      lead.status === 'New' ? 'bg-blue-50 text-blue-600' :
                      lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600' :
                      lead.status === 'Quoted' ? 'bg-purple-50 text-purple-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-sm text-blue-600 hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
