export default function AdminDashboard() {
  const stats = [
    { label: "Total Leads", value: "128", trend: "+12%", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "New Leads", value: "24", trend: "+4%", color: "text-green-600", bg: "bg-green-50" },
    { label: "Projects", value: "46", trend: "0%", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Published Articles", value: "18", trend: "+2%", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const recentLeads = [
    { id: "1024", name: "John Smith", service: "Bathroom Tiling", location: "Auckland", time: "2 hours ago", status: "New" },
    { id: "1025", name: "Sarah Wilson", service: "Kitchen Tiling", location: "North Shore", time: "5 hours ago", status: "Contacted" },
    { id: "1026", name: "Michael Brown", service: "Floor Tiling", location: "West Auckland", time: "1 day ago", status: "Quoted" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">{stat.label}</h3>
              <span className={`text-xs font-bold ${stat.color} ${stat.bg} px-2 py-1 rounded-full`}>{stat.trend}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Leads</h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium border-b border-slate-100">ID</th>
                <th className="p-4 font-medium border-b border-slate-100">Customer</th>
                <th className="p-4 font-medium border-b border-slate-100">Service</th>
                <th className="p-4 font-medium border-b border-slate-100">Location</th>
                <th className="p-4 font-medium border-b border-slate-100">Time</th>
                <th className="p-4 font-medium border-b border-slate-100">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
                  <td className="p-4 text-sm text-slate-500">#{lead.id}</td>
                  <td className="p-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="p-4 text-sm text-slate-600">{lead.service}</td>
                  <td className="p-4 text-sm text-slate-600">{lead.location}</td>
                  <td className="p-4 text-sm text-slate-500">{lead.time}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      lead.status === 'New' ? 'bg-blue-50 text-blue-600' :
                      lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {lead.status}
                    </span>
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
