import { Database, Upload, Search, FileText, Folder, BarChart3, Brain } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function KnowledgePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="text-purple-500" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-white">Knowledge Board</h1>
            <p className="text-gray-400">Organize and analyze your data insights</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="secondary" leftIcon={<Search size={16} />}>
            Search
          </Button>
          <Button variant="primary" leftIcon={<Upload size={16} />}>
            Upload Data
          </Button>
        </div>
      </div>

      {/* Knowledge stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="text-blue-500" size={24} />
            <h3 className="font-semibold">Documents</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">1,247</p>
          <p className="text-sm text-gray-400">Total files</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <Folder className="text-green-500" size={24} />
            <h3 className="font-semibold">Categories</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">24</p>
          <p className="text-sm text-gray-400">Organized</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="text-purple-500" size={24} />
            <h3 className="font-semibold">Insights</h3>
          </div>
          <p className="text-3xl font-bold text-purple-500">156</p>
          <p className="text-sm text-gray-400">AI generated</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="text-orange-500" size={24} />
            <h3 className="font-semibold">Analytics</h3>
          </div>
          <p className="text-3xl font-bold text-orange-500">89%</p>
          <p className="text-sm text-gray-400">Processing rate</p>
        </div>
      </div>

      {/* Knowledge grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent uploads */}
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center space-x-3 mb-6">
            <Upload className="text-blue-500" size={20} />
            <h3 className="font-semibold text-white">Recent Uploads</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Project_Analysis.pdf', size: '2.4 MB', type: 'PDF', time: '2 hours ago' },
              { name: 'Customer_Data.csv', size: '1.8 MB', type: 'CSV', time: '4 hours ago' },
              { name: 'Meeting_Notes.docx', size: '524 KB', type: 'DOCX', time: '6 hours ago' },
            ].map((file, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{file.name}</p>
                  <div className="flex space-x-4 text-sm text-gray-400">
                    <span>{file.size}</span>
                    <span>{file.type}</span>
                    <span>{file.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="text-purple-500" size={20} />
            <h3 className="font-semibold text-white">AI Insights</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                title: 'Customer Satisfaction Trend', 
                insight: 'Satisfaction scores increased 23% this month',
                confidence: '92%'
              },
              { 
                title: 'Data Quality Analysis', 
                insight: 'Found 156 potential data inconsistencies',
                confidence: '87%'
              },
              { 
                title: 'Usage Pattern Detection', 
                insight: 'Peak usage shifted to afternoon hours',
                confidence: '94%'
              },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <span className="text-xs bg-purple-600 px-2 py-1 rounded text-white">
                    {item.confidence}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data categories */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="font-semibold text-white mb-6">Data Categories</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Documents', count: 342, color: 'bg-blue-600' },
            { name: 'Analytics', count: 156, color: 'bg-green-600' },
            { name: 'Reports', count: 89, color: 'bg-purple-600' },
            { name: 'Media', count: 267, color: 'bg-orange-600' },
          ].map((category, i) => (
            <div key={i} className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors">
              <div className={`w-3 h-3 ${category.color} rounded-full mb-3`}></div>
              <p className="font-medium text-white">{category.name}</p>
              <p className="text-sm text-gray-400">{category.count} items</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <div className="space-y-2 text-gray-400">
          <p>• Advanced semantic search across all data</p>
          <p>• AI-powered data insights and recommendations</p>
          <p>• Interactive data visualization and charts</p>
          <p>• Knowledge base organization and tagging</p>
          <p>• Real-time data processing and analysis</p>
        </div>
      </div>
    </div>
  )
}