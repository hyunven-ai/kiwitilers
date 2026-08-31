import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    { id: 1, title: "Bathroom Tiling", active: true },
    { id: 2, title: "Kitchen Tiling", active: true },
    { id: 3, title: "Floor Tiling", active: true },
    { id: 4, title: "Wall Tiling", active: true },
    { id: 5, title: "Outdoor Tiling", active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Services Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Add Service</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-slate-900">{service.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${service.active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {service.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
