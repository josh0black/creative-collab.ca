
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Play, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample episode data - in a real app, this would come from an API or CMS
const episodes = [
  {
    id: "1",
    title: "The Art of Creative Collaboration",
    description: "Exploring how creative minds come together to produce extraordinary work. We dive deep into the psychology and practical aspects of collaborative creativity.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "24:15",
    publishDate: "2024-01-15",
    tags: ["creativity", "collaboration", "psychology"]
  },
  {
    id: "2", 
    title: "Building Creative Teams That Actually Work",
    description: "From hiring to managing, learn the secrets of assembling and leading creative teams that produce breakthrough results consistently.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "31:42",
    publishDate: "2024-01-22",
    tags: ["teams", "management", "leadership"]
  },
  {
    id: "3",
    title: "The Future of Creative Industries",
    description: "What's next for creative professionals? We explore emerging trends, technologies, and opportunities shaping the creative landscape.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "28:33",
    publishDate: "2024-01-29",
    tags: ["future", "technology", "trends"]
  },
  {
    id: "4",
    title: "Overcoming Creative Blocks",
    description: "Practical strategies and mindset shifts to break through creative barriers and maintain consistent creative output.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "22:18",
    publishDate: "2024-02-05",
    tags: ["creativity", "productivity", "mindset"]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Creative Collab
              </h1>
              <p className="text-slate-600 mt-1">Unleashing Creative Potential Together</p>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Explore Creative Collaboration
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Dive deep into the world of creative collaboration with our comprehensive video series. 
            Each episode features full transcripts, making content easily searchable and accessible.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map((episode, index) => (
            <Card key={episode.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                    Episode {episode.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {episode.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {episode.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(episode.publishDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {episode.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link to={`/episode/${episode.id}`}>
                    Watch Episode
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEpisodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No episodes found matching your search.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Creative Collab</h3>
          <p className="text-slate-300 mb-4">Empowering creative collaboration worldwide</p>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
            <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
              Subscribe on YouTube
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
