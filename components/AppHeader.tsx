import { Rocket } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex justify-center items-center mb-8">
      <div className="flex items-center gap-2">
        <Rocket className="w-8 h-8 text-blue-400" />
        <h1 className="text-4xl font-bold">
          <span className="text-blue-400">Todo</span>
          <span className="text-purple-400">App</span>
        </h1>
      </div>
    </header>
  );
}