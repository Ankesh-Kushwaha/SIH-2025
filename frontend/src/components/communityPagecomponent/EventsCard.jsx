import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function EventsCard() {
  return (
    <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <Leaf className="text-purple-500 mr-2 h-6 w-6" /> Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold">Beach Cleanup Drive</h3>
          <p className="text-sm text-gray-500">
            15 Sept 2023 | Juhu Beach, Mumbai
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-green-500 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
              +200 pts
            </span>
            <Button size="sm" className="bg-green-500 text-white rounded-full">
              Join
            </Button>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold">E-Waste Recycling Camp</h3>
          <p className="text-sm text-gray-500">
            18 Sept 2023 | Sublic Tech Park
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-green-500 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
              +250 pts
            </span>
            <Button size="sm" className="bg-green-500 text-white rounded-full">
              Join
            </Button>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold">Sustainable Living Workshop</h3>
          <p className="text-sm text-gray-500">23 Sept 2023 | Online Event</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-blue-500 font-bold bg-blue-100 px-3 py-1 rounded-full text-sm">
              21 attending
            </span>
            <Button size="sm" className="bg-blue-500 text-white rounded-full">
              Register
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
