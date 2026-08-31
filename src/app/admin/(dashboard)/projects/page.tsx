import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Projects Portfolio</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Add Project</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <div className="text-4xl mb-4">🏗️</div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">No projects yet</h2>
        <p className="text-slate-500 mb-6">Start building your portfolio by adding your first completed project.</p>
        <Button variant="outline">Add First Project</Button>
      </div>
    </div>
  );
}
